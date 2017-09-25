import React, {Component} from 'react';

// addButton
class Menu extends Component {
  static propTypes = {
    getWindow: React.PropTypes.func.isRequired,
    setToUpdate: React.PropTypes.func.isRequired,
    showSearchForm: React.PropTypes.func.isRequired,
    searchString: React.PropTypes.string.isRequired,
    setSearchDate: React.PropTypes.func.isRequired,
    libraries: React.PropTypes.array.isRequired,

  };

  render() {
    const {
      getWindow,
      setToUpdate,
      showSearchForm,
      searchString,
      setSearchDate,
      libraries,
    } = this.props;

    return (
      <div className="block">
        <button onClick={getWindow} className="block_button block_button_add">Перейти</button>
        <button onClick={setToUpdate} className="block_button block_button_update">Обновить</button>
        <div className="search_icon"></div>
        <input className="search_input" placeholder="Событие, дата или участник"
          onChange={(e) => showSearchForm(e)}
          onClick={getWindow}/>
        {searchString && <div className="search_form">
          <div className="triangle_search_form"/>
          <div>
            {libraries.map((l, index) => {
              return <div className="block_search" key={index} value={l.date} onClick={(e) => setSearchDate(e)}>
                <div className="block_title">{l.title}</div>
                <div className="block_title">{l.currentDate}</div>
              </div>;
            })}
          </div>
        </div>}
      </div>
    );
  }
}

export default Menu