import React, { Component } from 'react'

//addButton
class Menu extends Component {
    render(){
        return (
            <div className="block">
                <button onClick = {this.props.getWindow} className = "block_button block_button_add">Перейти</button>
                <button onClick = {this.props.setToUpdate} className = "block_button block_button_update">Обновить</button>
                <div className = "search_icon"></div>
                <input className = "search_input" placeholder="Событие, дата или участник"/>
            </div>
        )}
}

export default Menu

