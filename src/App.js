import React, { Component } from 'react';
import './App.css'
//import './style.sass'

import Menu from './Menu'
import AddEvent from './addEvent'
//import addWindowFullEvent from './addWindowFullEvent'
import AddEventFull from './addEventFull'
import Transition from './Transition'

//App
class App extends Component {

    constructor(props){
        super(props);

        this.state = {window: false, window_full: false, date: new Date(), windowState: null, modalStyle: null};
        this.getWindow = this.getWindow.bind(this);
        this.setToUpdate = this.setToUpdate.bind(this);
        this.createCalendar = this.createCalendar.bind(this);
        this.getPreviousDate = this.getPreviousDate.bind(this);
        this.getNextDate = this.getNextDate.bind(this);
        this.month = this.month.bind(this);
        this.getToday = this.getToday.bind(this);
        this.getDay = this.getDay.bind(this);
        this.getLastDayOfMonth = this.getLastDayOfMonth.bind(this);
        this.getDateToMonth = this.getDateToMonth.bind(this);
        this.spl = this.spl.bind(this);
        this.setEvent = this.setEvent.bind(this);

    }

    getWindow(e) {

        //console.log(e.currentTarget.className)
        e.preventDefault();
        //let target = e.target;
        //console.log(target.getBoundingClientRect());
        debugger;
        if (e.currentTarget.className === 'block_button block_button_add' || e.currentTarget.className === 'button_close short') {
            this.setState({
                window: !this.state.window, window_full: false
            })
        } else if(e.currentTarget.className === 'test1' || e.currentTarget.className === 'button_close full') {
            this.setState({
                window_full: !this.state.window_full, window: false
            })
        }

        //console.log(e.target.parentElement.parentElement.nextSibling);
         debugger;
         if (!e.currentTarget.parentElement.nextSibling && !e.currentTarget.nextSibling){
            this.setState({
                windowState: '--bottom_right'
            })
        }  else if (!e.currentTarget.parentElement.nextSibling
             && e.currentTarget.nextSibling){
            this.setState({
                windowState: '--bottom'
            })
        }
         else if (e.currentTarget.parentElement.nextSibling
             && !e.currentTarget.nextSibling){
             this.setState({
                 windowState: '--right'
             })
         }
        else {
            this.setState({
                windowState: '',
                modalStyle: {
                    position: 'absolute',
                    top: 155 + e.currentTarget.offsetTop,
                    left: 46 + e.currentTarget.offsetLeft + e.currentTarget.clientWidth
                }
            })
        }
        console.log(e.currentTarget.parentElement.offsetLeft);
        console.log(e.currentTarget.parentElement.offsetTop);
        console.log(e.currentTarget.parentElement.clientHeight);
        console.log(e.currentTarget.parentElement.clientWidth);
        debugger
     }

    getNextDate(e){
        e.preventDefault();
        this.setState({
            date: this.month(1),
            window_full: false
           });
    }

    getPreviousDate(e){
        e.preventDefault();
        this.setState({
            date: this.month(0),
            window_full: false
          });
    }

    month(el) {
        var D = this.state.date;
        if(el === 1) {
            D.setMonth(D.getMonth() + 1);
        } else {
            D.setMonth(D.getMonth() - 1);
        }
        return D
     }

    getToday(e){
        let date = new Date();
        e.preventDefault();
        this.setState({
            date: date,
            window_full: false
        });
    }

    createCalendar (year, month) {


        const weeks = ['понедельник','вторник','среда','четверг','пятница', 'суббота', 'воскресенье'];

        const arr = [];


        let mon = month; // месяцы в JS идут от 0 до 11, а не от 1 до 12
        let d = new Date(year, mon);
        let d0 = this.getLastDayOfMonth (year, mon);

         // заполнить первый ряд от понедельника
        // и до дня, с которого начинается месяц
        // * * * | 1  2  3  4
        let firstDay = this.getDay(d);

        for (let i = 1; i <= firstDay; i++) {
            let a = d0-(firstDay-i);
            arr.push({
                day: a,
                date: this.getDateToMonth(a, mon, year),
                event: '',//localStorageEvents[days.date] || {}
                month: mon,
                year: year
            })
        }

        // ячейки календаря с датами
        while (d.getMonth() === mon) {
            let a = d.getDate();

            arr.push({
                day: a,
                date: this.getDateToMonth(a, mon + 1, year),
                event: '',//localStorageEvents[days.date] || {}
                month: mon + 1,
                year: year
            });
            d.setDate(a + 1);
        }

        //debugger
        //let test = 8 - this.getDay(d);
        let test = 43 - arr.length;
        // добить таблицу пустыми ячейками, если нужно
        if (this.getDay(d) !== 0 || arr.length !== 43) {
           for (let i = 1; i < test; i++) {
               let a = i;

               arr.push({
                   day: a,
                   date: this.getDateToMonth(a, mon + 2, year),
                   event: '',//localStorageEvents[days.date] || {}
                   month: mon + 2,
                   year: year
               })
            }
        }


        let result = this.spl(arr, 7);

        for (var i = 0; i < result[0].length; i++) {
            result[0][i].day = weeks[i]+', '+result[0][i].day
        }

        return result


    }

    getDateToMonth ( day, month, year ){
        if(month < 10) month = '0'+month;
        return day+'.'+month+'.'+year
    }

    spl(arr, size) {
        var result = [];
        var len = arr.length;
        for (var i=0; i<len; i+=size) {
            result.push(arr.slice(i,i+size));
        }
        return result;
    }

    getDay(date) { // получить номер дня недели, от 0(пн) до 6(вс)
        let day = date.getDay();
        if (day === 0) day = 7;
        return day - 1;
    }

    getLastDayOfMonth(year, month) {
        var date = new Date(year, month, 0);
        return date.getDate();
    }

    setToUpdate() {
        alert('обновление')
    }

    setEvent(){
        //console.log(arguments)
        debugger;

        if (arguments[0] === "") {

            alert("Введите дату")

        } else if ( arguments.length > 1 ){

        } else {

            if (new Date(arguments[0]) === 'Invalid Date') {
                alert('Дата не валидна')
            } else {
                let args = arguments[0].split('.');
                let date = new Date(args[2], args[1]-1, args[0]);
                this.setState({
                    date: date,
                    window: false,
                    window_full: true
                });
            }
        }
    }

    render(){

        //debugger
        let nowMonth = this.state.date.getMonth();
        let nowYear = this.state.date.getFullYear();

        const Events = 'we';
        const json = JSON.stringify(Events);

        localStorage.setItem("myKey", json);

        let locStore = JSON.parse(localStorage.getItem("myKey"));

        const weeks = this.createCalendar(nowYear, nowMonth);

        //console.log(Events)
        localStorage.clear();

        return (
                <div className = "header">
                    {<Menu getWindow = {this.getWindow} setToUpdate = {this.setToUpdate} />}
                    {this.state.window_full && <AddEventFull
                        getWindow = {this.getWindow}
                        setEvent = {this.setEvent}
                        style = {this.state.modalStyle}
                        windowState = {this.state.windowState}/>}
                    <Transition
                        toDay = {this.getToday}
                        date = {this.state.date}
                        month = {nowMonth}
                        year = {nowYear}
                        NextDate = {this.getNextDate}
                        PreviousDate = {this.getPreviousDate}/>
                   {/* <addWindowFullEvent getWindow = {this.getWindow}/>*/}
                    {this.state.window && <AddEvent
                        getWindow = {this.getWindow} setEvent = {this.setEvent}/>}
                    <div className="calendar">
                        <table>
                            <tbody>
                            {weeks.map((week, index) => {
                                return (
                                    <tr key={index}>
                                        {week.map((day, index) => {
                                            return <td key={index} onClick = {this.getWindow} className="test1">
                                                        <div className="cell">
                                                            <p className="clip">{day.day}</p>
                                                        </div>
                                                   </td>
                                        })}
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
        )}
}

export default App;













//Сева писал
/*
 class App extends Component {
 render(){
 return <Header msg="HeLLo NikiTA" foo="bar"/>
 }
 }

 class Header extends Component {
 constructor() {
 super();

 this.state = {
 msg: 'Hello World'
 }
 }
 capitalize(msg) {
 return msg[0].toUpperCase() + msg.slice(1).toLowerCase();
 }

 changePhrase() {
 this.setState({
 msg: 'LOL'
 });
 }
 render() {
 return <div className="container" onClick={() => this.changePhrase.call(this)}>{this.capitalize(this.state.msg)}!</div>
 }
 }
 export default App;
 */