import React, { Component } from 'react';
import gotService from '../../services/gotService';
import CharDetails, {Field} from '../charDetails';


export default class HousesItem extends Component {
    gotService = new gotService();

    render () {
        
        return (
            <CharDetails 
                charId = {this.props.houseId}
                getData = {this.gotService.getHouse}>
                <Field field = 'region' label = 'Region' ></Field>
                <Field field = 'coatOfArms' label = 'Coat Of Arms' ></Field>
                <Field field = 'words' label = 'Words' ></Field>
                <Field field = 'titles' label = 'Titles' ></Field>
            </CharDetails>
        )
    }
}

