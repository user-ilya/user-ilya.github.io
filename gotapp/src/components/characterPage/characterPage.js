import React, {Component} from 'react';
import ItemList from '../itemList';
import ErrorMassage from '../error';
import gotService from '../../services/gotService';
import './characterPage.css';
import { withRouter } from 'react-router-dom';



class CharacterPage extends Component {
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
            onItemSelected={(charId) => {
                this.props.history.push(`${charId}`)
            }} 
            getData = {this.gotService.getAllCharacters}
            renderItem = {(item) => {
                return `${item.name} (${item.gender})`
            }}/>
        )
        
    }
}
export default withRouter(CharacterPage)