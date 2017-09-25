import React, {Component} from 'react';

// addButton
class AddEventFull extends Component {
  static propTypes = {
    windowState: React.PropTypes.bool.isRequired,
    day: React.PropTypes.string.isRequired,
    getWindow: React.PropTypes.func.isRequired,
    style: React.PropTypes.object.isRequired,
    setFullEvent: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    if (!localStorage[this.props.day]) {
      this.state = {
        title: '',
        group: '',
        description: '',
      };
    } else {
      this.state = {
        title: JSON.parse(localStorage[this.props.day]).title,
        group: JSON.parse(localStorage[this.props.day]).group,
        description: JSON.parse(localStorage[this.props.day]).description,
      };
    }
  }

  writeEvent = (e) => {
    if (e.currentTarget.className === 'input_event_full input_event_full_title') {
      this.setState({
        title: e.target.value,
      });
    } else if (e.currentTarget.className === 'input_event_full input_event_full_group') {
      this.setState({
        group: e.target.value,
      });
    } else if (e.currentTarget.className === 'input_event_full input_event_full_description') {
      this.setState({
        description: e.target.value,
      });
    }
  };

  clearForm = () => {
    this.setState({title: '', group: '', description: ''});
  };

  render() {
    const {
      day,
      windowState,
      getWindow,
      style,
      setFullEvent,
    } = this.props;

    const month = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
      'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

    let currentDay = day.split('.')[0];
    let currentMonth = (day.split('.')[1].charAt(0) === 0) ?
      (day.split('.')[1].charAt(1) - 1) : (day.split('.')[1] - 1);
    let currentDate = currentDay + ' ' + month[currentMonth];
    // console.log(localStorage);

    return (
      <div className="full_window" style={style}>
        <button onClick={getWindow} className="button_close full">х</button>
        <button
          className="add_button add_button_event_full"
          onClick={() => setFullEvent(day, this.state.title, this.state.group, this.state.description, currentDate)}>
          Готово
        </button>
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
        <div className={'full_window_triangle_full full_window_triangle_full' + windowState}/>
      </div>
    );
  }
}

export default AddEventFull


