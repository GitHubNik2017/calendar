import React, { Component } from 'react'
import InputElement from 'react-input-mask';

//addButton
class AddEvent extends Component {

    render() {

        //console.log(this.props.aa)

        return (
        <div className="addEvent">
            <div className="triangle"></div>
            <button onClick = {this.props.getWindow} className="addDivEvent2">х</button>
            <button className="addDivEvent" onClick={()=>this.props.setEvent(this.input.value)}>Создать</button>
            <InputElement className="inputEvent"
                   ref={(input) => this.input = input}
                   placeholder="ДД.ММ.ГГГГ"
                   mask="99.99.9999"
                   >
            </InputElement>
        </div>
        )}
}

export default AddEvent


