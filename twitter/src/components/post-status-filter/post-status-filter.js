import React, { Component } from 'react';
import './post-status-filter.css';

export default class PostStatusFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: ''
        }
        this.buttons = [
            {name: 'all', label: 'Все'},
            {name: 'like', label: 'Понравилось'}
        ]
    }

    render () {
        const buttons = this.buttons.map(({name, label}) => {
            const active = this.props.filter === name; 
            const classForBtn = active ? 'btn-info' : 'btn-outline-secondary';
            return (
            <button 
                key= {name} 
                type='button' 
                className={`btn ${classForBtn}`}
                onClick = {() => {
                    return this.props.onFilterSelect(name)
                }}>
                {label} </button>
            )
        })
        return(
            <div className="btn-group" >
                {buttons}
           </div>
        )
    }
}