import React, { Component } from 'react'

class Transition extends Component {

    render(){

        var month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

        return (
            <div className="transition">
                <button onClick={this.props.PreviousDate} className = "transition_button transition_button_left"/>
                <div className="spanCss">{month[this.props.month]+' '+this.props.year}</div>
                <button onClick={this.props.NextDate} className = "transition_button transition_button_right"/>
                <button onClick={this.props.toDay} className = "transition_button transition_button_to_day">Сегодня</button>
            </div>
        )}
}

export default Transition



