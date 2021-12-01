import React, {Component} from 'react';
import './randomChar.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMassage from '../error';

export default class RandomChar extends Component {

    gotService = new gotService();
    state = {
        resolve: {},
        loading: true,
        error: false

    }


    componentDidMount() {
        this.updateChar();
        this.timerID = setInterval(this.updateChar, 4000);
        console.log('live')
    };

    componentWillUnmount() {
        clearInterval(this.timerID);
        console.log('died')
    }


    onCharLoaded = (resolve) => {
        this.setState({
            resolve,
            loading: false,
            
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random()*240 + 25); // 25<id<240
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onError = (error) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    render() {
        const { resolve, loading, error } = this.state;

        const errorMassage = error ? <ErrorMassage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View resolve={resolve}/> : null;

        return (
            <div className="random-block rounded">
                {content}
                {spinner}
                {errorMassage}
            </div>
        );
    }
}

const View = ({resolve}) => {
    const  { name, gender, born, died, culture} = resolve;
    return (
        <React.Fragment>
                <h4>Random Character: {name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender </span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born </span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died </span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture </span>
                        <span>{culture}</span>
                    </li>
                </ul>
        </React.Fragment>
    )
}
