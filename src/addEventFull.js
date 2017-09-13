import React, {Component} from 'react'

//addButton
class AddEventFull extends Component {

    constructor(props) {
        super(props);
        if (!localStorage[this.props.day]) {
            this.state = {
                title: '',
                group: '',
                description: ''
            }
        } else {
            this.state = {
                title: JSON.parse(localStorage[this.props.day]).title,
                group: JSON.parse(localStorage[this.props.day]).group,
                description: JSON.parse(localStorage[this.props.day]).description
            }
        }

    }

    writeEvent = (e) => {

        if (e.currentTarget.className === 'input_event_full input_event_full_title') {
            this.setState({
                title: e.target.value,
            })
        } else if (e.currentTarget.className === 'input_event_full input_event_full_group') {
            this.setState({
                group: e.target.value,
            })
        } else if (e.currentTarget.className === 'input_event_full input_event_full_description') {
            this.setState({
                description: e.target.value
            })
        }

    };

    clearForm = () => {
        this.setState({title: '', group: '', description: ''})
    };

    render() {

        const month = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
            "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

        let currentDay = this.props.day.split('.')[0];
        let currentMonth = (this.props.day.split('.')[1].charAt(0) === 0) ? (this.props.day.split('.')[1].charAt(1) - 1) : (this.props.day.split('.')[1] - 1);
        let currentDate = currentDay +' '+ month[currentMonth];
        //console.log(localStorage);

        return (
            <div className="full_window" style={this.props.style}>
                <button onClick={this.props.getWindow} className="button_close full">х</button>
                <button
                    className="add_button add_button_event_full"
                    onClick={() => this.props.setEvent(this.props.day, this.state.title, this.state.group, this.state.description, currentDate)}>Готово</button>
                <button className="add_button add_button_remove_event" onClick={this.clearForm}>Удалить</button>
                <div className="input_event_full input_event_full_date">{currentDate}</div>
                <input
                    className="input_event_full input_event_full_title"
                    placeholder="Событие"
                    onChange={this.writeEvent}
                    value={this.state.title}/>
                <input
                    className="input_event_full input_event_full_group"
                    placeholder="Имена участников"
                    onChange={this.writeEvent}
                    value={this.state.group}/>
                <textarea
                    className="input_event_full input_event_full_description"
                    placeholder="Описание"
                    onChange={this.writeEvent}
                    value={this.state.description}/>
                <div className={'full_window_triangle_full full_window_triangle_full' + this.props.windowState}/>
            </div>
        )
    }
}

export default AddEventFull


