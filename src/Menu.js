import React, { Component } from 'react'

//addButton
class Menu extends Component {
    render(){
        return (
            <div className="block">
                <button onClick = {this.props.getWindow} className = "addDiv">Добавить</button>
                <button onClick = {this.props.setToUpdate} className = "addDiv2">Обновить</button>
                <div className = "image"></div>
                <input className = "searchInput" placeholder="Событие, дата или участник"></input>
            </div>
        )}
}

export default Menu

