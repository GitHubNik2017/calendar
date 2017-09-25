import React, {Component} from 'react';
import './css/App.css';

import Menu from './Menu';
import AddEvent from './addEvent';
import AddEventFull from './addEventFull';
import Transition from './Transition';

// App
class App extends Component {
  state = {
    window: false, window_full: false,
    date: new Date(), windowState: null, modalStyle: null,
    day: null, searchString: '', searchDate: '',
  };

  getWindow = (e, date) => {
    // debugger;
    if (e.currentTarget.className === 'block_button block_button_add' ||
      e.currentTarget.className === 'button_close short') {
      this.setState({
        window: !this.state.window, window_full: false, searchString: '',
      });
    } else if (e.currentTarget.className === 'test1' || e.currentTarget.className === 'button_close full'
      || e.currentTarget.className === 'table_data_border') {
      this.setState({
        window_full: !this.state.window_full, window: false, searchString: '',
      });
    } else if (e.currentTarget.className === 'search_input') {
      this.setState({
        window_full: false, window: false,
      });
    }


    if (!e.currentTarget.parentElement.nextSibling && e.currentTarget.cellIndex === 5) {
      this.setState({
        windowState: '--bottom_previous_right',
        modalStyle: {
          position: 'absolute',
          top: e.currentTarget.offsetTop,
          left: 46 + e.currentTarget.offsetLeft - (e.currentTarget.clientWidth * 2),
        },
      });
    } else if (!e.currentTarget.parentElement.nextSibling && e.currentTarget.cellIndex === 6) {
      this.setState({
        windowState: '--bottom_right',
        modalStyle: {
          position: 'absolute',
          top: e.currentTarget.offsetTop,
          left: 709,
        },
      });
    } else if (!e.currentTarget.parentElement.nextSibling
      && e.currentTarget.nextSibling) {
      this.setState({
        windowState: '--bottom',
        modalStyle: {
          position: 'absolute',
          top: e.currentTarget.offsetTop,
          left: 46 + e.currentTarget.offsetLeft + e.currentTarget.clientWidth,
        },
      });
    } else if (e.currentTarget.parentElement.nextSibling
      && !e.currentTarget.nextSibling || !e.currentTarget.nextSibling.nextSibling) {
      this.setState({
        windowState: '--right',
        modalStyle: {
          position: 'absolute',
          top: 155 + e.currentTarget.offsetTop,
          left: 46 + e.currentTarget.offsetLeft - (e.currentTarget.clientWidth * 2),
        },
      });
    } else {
      this.setState({
        windowState: '',
        modalStyle: {
          position: 'absolute',
          top: 155 + e.currentTarget.offsetTop,
          left: 46 + e.currentTarget.offsetLeft + e.currentTarget.clientWidth,
        },
      });
    }

    this.setState({day: date});

    // debugger
  };

  getNextDate = () => {
    this.setState({date: this.getNewDate(1), window_full: false});
  };

  getPreviousDate = () => {
    this.setState({date: this.getNewDate(0), window_full: false});
  };

  getNewDate = (flag) => {
    let date = this.state.date;
    let oldDate = date.getDate();

    if (flag) {
      date.setMonth(date.getMonth() + 1);
    } else {
      date.setMonth(date.getMonth() - 1);
    }
    if (date.getDate() !== oldDate) {
      date.setDate(0);
    }
    return date
  };

  getToday = () => {
    let date = new Date();
    this.setState({date: date, window_full: false});
  };

  createCalendar = (year, month) => {
    const weeks = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];

    const arr = [];

    let date = new Date(year, month);
    let lastDay = this.getLastDayOfMonth(year, month);
    let firstDay = this.getDay(date);

    for (let i = 1; i <= firstDay; i++) {
      let a = lastDay - (firstDay - i);
      arr.push({
        day: a,
        date: this.getDateToMonth(a, month, year),
        event: JSON.parse(localStorage[this.getDateToMonth(a, month, year)] || '{}'),
        month: month,
        year: year,
        flag: (this.getDateToMonth(a, month + 1, year) === this.state.searchDate),
      });
    }

    while (date.getMonth() === month) {
      let b = date.getDate();

      arr.push({
        day: b,
        date: this.getDateToMonth(b, month + 1, year),
        event: JSON.parse(localStorage[this.getDateToMonth(b, month + 1, year)] || '{}'),
        month: month + 1,
        year: year,
        flag: (this.getDateToMonth(b, month + 1, year) === this.state.searchDate),
      });
      date.setDate(b + 1);
    }

    let test = 43 - arr.length;

    if (this.getDay(date) !== 0 || arr.length !== 43) {
      for (let i = 1; i < test; i++) {
        arr.push({
          day: i,
          date: this.getDateToMonth(i, month + 2, year),
          event: JSON.parse(localStorage[this.getDateToMonth(i, month + 2, year)] || '{}'),
          month: month + 2,
          year: year,
          flag: (this.getDateToMonth(i, month + 2, year) === this.state.searchDate),
        });
      }
    }


    let result = this.spl(arr, 7);

    for (let i = 0; i < result[0].length; i++) {
      result[0][i].day = weeks[i] + ', ' + result[0][i].day;
    }
    return result;
  };

  getDateToMonth = (day, month, year) => {
    if (month < 10) month = '0' + month;
    return day + '.' + month + '.' + year;
  };

  spl = (arr, size) => {
    let result = [];
    let len = arr.length;
    for (let i = 0; i < len; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  getDay = (date) => { // получить номер дня недели, от 0(пн) до 6(вс)
    let day = date.getDay();
    if (day === 0) day = 7;
    return day - 1;
  };

  getLastDayOfMonth = (year, month) => {
    let date = new Date(year, month, 0);
    return date.getDate();
  };

  setToUpdate = () => {
    alert('обновление');
    localStorage.clear();
  };

  setEvent = (e, value) => {
    if (arguments[1] === '') {
      alert('Введите дату');
    } else if (new Date(arguments[1]) === 'Invalid Date') {
      alert('Дата не валидна');
    } else {
      let args = value.split('.');
      let date = new Date(args[2], args[1] - 1, args[0]);
      this.setState({
        date: date,
        window: false,
      });
    }

  };

  setFullEvent = (day, title, group, description, currentDate) => {
    debugger;
    let json = JSON.stringify({
      date: day,
      title: title,
      group: group,
      description: description,
      currentDate: currentDate,
    });


    localStorage.setItem(day, json);

    this.setState({
      window_full: false
    });
  };

  showSearchForm = (e) => {
    this.setState({searchString: e.target.value});
  };

  setSearchDate = (e) => {
    debugger;
    let args = e.currentTarget.attributes.value.nodeValue.split('.');
    let date = new Date(args[2], args[1] - 1, args[0]);
    this.setState({searchDate: e.currentTarget.attributes.value.nodeValue, searchString: '', date: date});
  };

  setBorderCell = () => {
    setTimeout(() => {
      debugger;
      this.setState({searchDate: '', searchString: ''});
    }, 1000);
    return 'table_data_border';
  };

  render() {
    let nowMonth = this.state.date.getMonth();
    let nowYear = this.state.date.getFullYear();

    const weeks = this.createCalendar(nowYear, nowMonth);

    let searchString = this.state.searchString.trim().toLowerCase();


    if (searchString.length > 0) {
      // console.log(searchString);

      var libraries = [];
      for (let elem in localStorage) {
        if (elem) {
          libraries.push(JSON.parse(localStorage[elem]));
        }
      }
      libraries = libraries.filter(function(l) {
        return l.title.toLowerCase().match(searchString);
      });
    }

    return (
      <div className="header">
        <Menu getWindow={this.getWindow} setToUpdate={this.setToUpdate}
          showSearchForm={this.showSearchForm}
          searchString={this.state.searchString}
          setSearchDate={this.setSearchDate}
          libraries={libraries}/>
        {this.state.window_full && <AddEventFull
          getWindow={this.getWindow}
          setEvent={this.setEvent}
          setFullEvent={this.setFullEvent}
          style={this.state.modalStyle}
          windowState={this.state.windowState}
          month={nowMonth}
          day={this.state.day}/>}
        <Transition
          toDate={this.getToday}
          date={this.state.date}
          month={nowMonth}
          year={nowYear}
          nextDate={this.getNextDate}
          prevDate={this.getPreviousDate}/>
        {this.state.window && <AddEvent
          getWindow={this.getWindow} setEvent={this.setEvent}/>}
        <div className="calendar">
          <table>
            <tbody>{weeks.map((week, index) => {
              return (
                <tr key={index}>{week.map((day, index) => {
                  return <td key={index} onClick={(e) => this.getWindow(e, day.date)}
                    className={(day.flag) ? this.setBorderCell() : 'test1'}>
                    <div className="cell">
                      <p className="clip">{day.day}</p>
                      <p className="clip_title">{day.event.title || null}</p>
                      <p className="clip_group">{day.event.group || null}</p>
                    </div>
                  </td>;
                })};
                </tr>);
            })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;