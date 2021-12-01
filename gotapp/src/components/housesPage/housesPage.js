import React, {Component} from 'react';
import ItemList from '../itemList';
import ErrorMassage from '../error';
import gotService from '../../services/gotService';
import {withRouter} from 'react-router-dom';
import './housesPage.css';

class HousesPage extends Component {

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
            onItemSelected = {(houseId) => {
                this.props.history.push(`${houseId}`)
            }}
                getData = {this.gotService.getAllHouses}
                renderItem = {(item) => {
                    return `${item.name} (${item.region})`
                }}/>
        )
        
    }
}

export default withRouter(HousesPage);