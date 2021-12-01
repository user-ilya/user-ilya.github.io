import React, { Component } from 'react';
import gotService from '../../services/gotService';
import CharDetails, {Field} from '../charDetails';


export default class BooksItem extends Component {
    gotService = new gotService();

    render () {
        
        return (
            <CharDetails 
                charId = {this.props.bookId}
                getData = {this.gotService.getBook}>
                <Field field = 'authors' label = 'Authors' ></Field>
                <Field field = 'numberOfPage' label = 'NumberOfPage' ></Field>
                <Field field = 'country' label = 'Country' ></Field>
                <Field field = 'publisher' label = 'Publisher' ></Field>
            </CharDetails>
        )
    }
}