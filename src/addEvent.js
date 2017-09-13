import React, { Component } from 'react'
import InputElement from 'react-input-mask';

//addButton
class AddEvent extends Component {

    static propTypes = {
        getWindow: React.PropTypes.func.isRequired,
        setEvent: React.PropTypes.func.isRequired
    };

    render() {

        const {
            getWindow,
            setEvent
        } = this.props;

        return (
        <div className="short_window">
            <div className="triangle triangle_short"/>
            <button onClick = {getWindow} className="button_close short">х</button>
            <button className="add_button add_button_event_short" onClick={(e)=>setEvent(e, this.input.value)}>Создать</button>
            <InputElement className="input_event_short"
                   ref={(input) => this.input = input}
                   placeholder="ДД.ММ.ГГГГ"
                   mask="99.99.9999"/>
        </div>
        )}
}

export default AddEvent


