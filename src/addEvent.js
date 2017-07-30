import React, { Component } from 'react'
import InputElement from 'react-input-mask';

//addButton
class AddEvent extends Component {

    render() {

        //console.log(this.props.aa)

        return (
        <div className="short_window">
            <div className="triangle triangle_short"/>
            <button onClick = {this.props.getWindow} className="button_close short">х</button>
            <button className="add_button add_button_event_short" onClick={()=>this.props.setEvent(this.input.value)}>Создать</button>
            <InputElement className="input_event_short"
                   ref={(input) => this.input = input}
                   placeholder="ДД.ММ.ГГГГ"
                   mask="99.99.9999"/>
        </div>
        )}
}

export default AddEvent


