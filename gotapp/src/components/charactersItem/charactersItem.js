import React, { Component } from 'react';
import gotService from '../../services/gotService';
import CharDetails, {Field} from '../charDetails';

export default class CharactersItem extends Component {
    gotService = new gotService();

    render () {
        return (
            <CharDetails 
                charId = {this.props.charId}
                getData = {this.gotService.getCharacter}>
                <Field field = 'gender' label = 'Gender' ></Field>
                <Field field = 'born' label = 'Born' ></Field>
                <Field field = 'died' label = 'Died' ></Field>
                <Field field = 'culture' label = 'Culture' ></Field>
            </CharDetails>
        )
    }
}
