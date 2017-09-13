import React, {Component} from 'react'

//addButton
class Menu extends Component {

    render() {

        return (
            <div className="block">
                <button onClick={this.props.getWindow} className="block_button block_button_add">Перейти</button>
                <button onClick={this.props.setToUpdate} className="block_button block_button_update">Обновить</button>
                <div className="search_icon"></div>
                <input className="search_input" placeholder="Событие, дата или участник"
                       onChange={(e) => this.props.showSearchForm(e)}
                       onClick={this.props.getWindow}/>
                {this.props.searchString && <div className="search_form" >
                    <div className="triangle_search_form"/>
                    <div>
                        {this.props.libraries.map((l) => {
                            return <div className="block_search" value={l.date} onClick={(e) => this.props.setSearchDate(e)}>
                                <div className="block_title">{l.title}</div>
                                <div className="block_title">{l.currentDate}</div>
                            </div>
                        })}
                    </div>
                </div>}
            </div>
        )
    }
}

export default Menu

