import React, {Component} from 'react';
import ItemList from '../itemList';
import ErrorMassage from '../error';
import gotService from '../../services/gotService';
import {withRouter} from 'react-router-dom';
import './booksPage.css';


export class BooksPage extends Component {

    gotService = new gotService();

    state = {
        error: false
    };


    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    render () {

        if (this.state.error) {
            return <ErrorMassage/>
        };

        return (
            <ItemList 
            onItemSelected = {(charId) => {
                this.props.history.push(`${charId}`)
            }} 
            getData = {this.gotService.getAllBooks}
            renderItem = {(item) => {
                return `${item.name} (${item.authors})`
            }}/>
        )
        
    }
}

export default withRouter(BooksPage);