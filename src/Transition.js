import React, { Component } from 'react'

class Transition extends Component {
/*    constructor(props){
        super(props);
    }*/

    render(){

        var month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

        return (
            <div className="addDivTransition">
                <button onClick={this.props.PreviousDate} className = "addDivTransition1"></button>
                <div className="spanCss">{month[this.props.month]+' '+this.props.year}</div>
                <button onClick={this.props.NextDate} className = "addDivTransition2"></button>
                <button onClick={this.props.toDay} className = "addDivTransition3">Сегодня</button>
            </div>
        )}
}

export default Transition



