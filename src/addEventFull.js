import React, { Component } from 'react'

//addButton
class AddEventFull extends Component {
    render(){
        return (
            <div className={'addDivEventFull' + this.props.widowState} style={this.props.style}>
                <button onClick = {this.props.getWindow} className = "addDivEventFull1">х</button>
                <button
                    className = "addDivEventFull2"
                    onClick={() => this.props.setEvent(this.input.value, this.input1.value,this.input2.value,this.input3.value)}>Готово</button>
                <button className = "addDivEventFull3">Удалить</button>
                <input
                    className = "inputEventFull1"
                    placeholder="Событие"
                    ref={(input) => this.input = input}></input>
                <input
                    className = "inputEventFull2"
                    placeholder="День, месяц, год"
                    ref={(input) => this.input1 = input}></input>
                <input
                    className = "inputEventFull3"
                    placeholder="Имена участников"
                    ref={(input) => this.input2 = input}></input>
                <textarea
                    className = "inputEventFull4"
                    placeholder="Описание"
                    ref={(input) => this.input3 = input}></textarea>
                <div className="triangle2"></div>
            </div>
        )}
}

export default AddEventFull


