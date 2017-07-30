import React, { Component } from 'react'

//addButton
class AddEventFull extends Component {
    render(){
        return (
            <div className="full_window" style={this.props.style}>
                <button onClick = {this.props.getWindow} className = "button_close full">х</button>
                <button
                    className = "add_button add_button_event_full"
                    onClick={() => this.props.setEvent(this.input.value, this.input1.value,this.input2.value,this.input3.value)}>Готово</button>
                <button className = "add_button add_button_remove_event">Удалить</button>
                <input
                    className = "input_event_full input_event_full_title"
                    placeholder="Событие"
                    ref={(input) => this.input = input}/>
                <input
                    className = "input_event_full input_event_full_date"
                    placeholder="День, месяц, год"
                    ref={(input) => this.input1 = input}/>
                <input
                    className = "input_event_full input_event_full_group"
                    placeholder="Имена участников"
                    ref={(input) => this.input2 = input}/>
                <textarea
                    className = "input_event_full input_event_full_description"
                    placeholder="Описание"
                    ref={(input) => this.input3 = input}/>
                <div className={'full_window_triangle_full full_window_triangle_full' + this.props.windowState}/>
            </div>
        )}
}

export default AddEventFull


