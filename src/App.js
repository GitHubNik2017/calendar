import React, { Component } from 'react';
import './App.css'

import Menu from './Menu'
import AddEvent from './addEvent'
//import addWindowFullEvent from './addWindowFullEvent'
import AddEventFull from './addEventFull'
import Transition from './Transition'

//App
class App extends Component {
    render(){
        return <Header/>
    }
}

//Header
class Header extends Component {

    constructor(props){
        super(props);

        this.state = {window: false, windowFull: false, date: new Date(), windowSate: ''};
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

        if (e.currentTarget.className === 'addDiv' || e.currentTarget.className === 'addDivEvent2') {
            this.setState({
                window: !this.state.window, windowfull: false
            })
        } else if(e.currentTarget.className === 'addCalendar' || e.currentTarget.className === 'addDivEventFull1') {
            this.setState({
                windowfull: !this.state.windowfull, window: false
            })
        }
        //console.log(e.target.nextSibling);
        //console.log(e.target.parentElement.nextSibling);
    }

    getNextDate(e){
        e.preventDefault();
        this.setState({
            date: this.month(1)
        });
    }

    getPreviousDate(e){
        e.preventDefault();
        this.setState({
            date: this.month(0)
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
            date: date
        });
    }

    createCalendar (year, month, events) {


        const weeks = ['понедельник','вторник','среда','четверг','пятница', 'суббота', 'воскресенье'];

        const arr = [];


        let mon = month; // месяцы в JS идут от 0 до 11, а не от 1 до 12
        let d = new Date(year, mon);
        let d0 = this.getLastDayOfMonth (year, mon);


        // заполнить первый ряд от понедельника
        // и до дня, с которого начинается месяц
        // * * * | 1  2  3  4
        let firstDay = this.getDay(d);

        //debugger
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

        //debugger
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


        let test = 8 - this.getDay(d);
        // добить таблицу пустыми ячейками, если нужно
        if (this.getDay(d) !== 0) {
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
            result[0][i].day = result[0][i].day+' '+weeks[i]
        }

        return result

    }

    getDateToMonth ( day, month, year ){
        if(month < 10) month = '0'+month
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

    setToUpdate(e) {
        alert('обновление')
    }

    setEvent(){
        console.log(arguments)
        debugger
        if ( arguments.length > 1 ){

        } else {

            if (new Date(arguments[0]) === 'Invalid Date') {
                alert('Дата не валидна')
            } else {
                let args = arguments[0].split('.');
                let date = new Date(args[2], args[1]-1, args[0]);
                this.setState({
                    date: date,
                    window: false,
                    windowfull: true
                });
            }
        }
    }

    render(){

        debugger
        let nowMonth = this.state.date.getMonth();
        let nowYear = this.state.date.getFullYear();

        const Events = 'we';
        const json = JSON.stringify(Events);

        localStorage.setItem("myKey", json);

        const locStore = JSON.parse(localStorage.getItem("myKey"));

        const weeks = this.createCalendar(nowYear, nowMonth, locStore);

        const modalStyle = {
            position: 'absolute',
            top: 320,
            left: 300
        };

        //console.log(Events)
        localStorage.clear();

        return (
        <div className = "header">
            {<Menu getWindow = {this.getWindow} setToUpdate = {this.setToUpdate} />}
            {this.state.windowfull && <AddEventFull getWindow = {this.getWindow} setEvent = {this.setEvent} style = {modalStyle} widowState = {this.state.windowSate}/>}
            <Transition toDay = {this.getToday} date = {this.state.date} month = {nowMonth} year = {nowYear} NextDate = {this.getNextDate} PreviousDate = {this.getPreviousDate}/>
           {/* <addWindowFullEvent getWindow = {this.getWindow}/>*/}
            {this.state.window && <AddEvent getWindow = {this.getWindow} setEvent = {this.setEvent}/>}
            <div onClick = {this.getWindow} className="addCalendar">
                <table>
                    <tbody>
                    {weeks.map((week, index) => {
                        return (
                            <tr key={index}>
                                {week.map((day, index) => {
                                    return <td key={index}><div>{day.day}</div></td>
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