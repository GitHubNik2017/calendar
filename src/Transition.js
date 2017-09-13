import React, { Component } from 'react'

class Transition extends Component {
    static propTypes = {
      year: React.PropTypes.string.isRequired,
      month: React.PropTypes.string.isRequired,
      nextDate: React.PropTypes.func.isRequired,
      prevDate: React.PropTypes.func.isRequired,
      toDate: React.PropTypes.func.isRequired
    };

    render(){
        const {
            year,
            month,
            nextDate,
            prevDate,
            toDate
        } = this.props;

        var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

        return (
            <div className="transition">
                <button onClick={prevDate} className = "transition_button transition_button_left"/>
                <div className="spanCss">{months[month]+' '+year}</div>
                <button onClick={nextDate} className = "transition_button transition_button_right"/>
                <button onClick={toDate} className = "transition_button transition_button_to_day">Сегодня</button>
            </div>
        )}
}

export default Transition



