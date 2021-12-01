import React, { Component } from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            term: ''
        }
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
    }

    onUpdateSearch(event) {
        const term = event.target.value;
        this.setState({term});
        this.props.onUpdateSearch(term);
    }

    render () {
        return (
            <input 
                type="text" 
                placeholder="Поиск по записям" 
                className="search-control search-input"
                onChange = {this.onUpdateSearch}
            />
        )
    }
}
