import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMassage from '../error';
import CharacterPage from '../characterPage';
import HousesPage from '../housesPage';
import BooksPage from '../booksPage';
import BooksItem from '../booksItem';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './app.css';
import HousesItem from '../housesItem';
import CharactersItem from '../charactersItem';


export default class App extends Component {
    gotService = new gotService();

    constructor() {
        super()
        this.state = {
            click: false,
            error: false
        }
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        }) 
    }

    onClickBtn = () => {
        this.setState({
            click: !this.state.click,
        })
    }

    render () {
        const {click, error} = this.state;
        const visibleRandomChar = click ? null   : <RandomChar /> ;

        if (error) {
           return <ErrorMassage />
        }

        return (
            <Router>
                <div className='app'>
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {visibleRandomChar}
                                <button 
                                    className='btn btn-primary mb-3'
                                    onClick={this.onClickBtn}
                                    >Скрыть/Открыть</button>
                            </Col>
                        </Row>
                        <Route 
                            path='/' 
                            exact 
                            component={() => (<h2>Hello World !!!</h2>)}/>
                        <Route  
                            path='/characters' 
                            exact 
                            component={CharacterPage}/>
                        <Route  
                            path='/books' 
                            exact 
                            component={BooksPage}/>
                        <Route  
                            path='/houses' 
                            exact 
                            component={HousesPage}/>
                        <Route 
                            path='/books/:id' 
                            render={
                                ({match}) => {
                                    const {id} = match.params;
                                    return <BooksItem bookId = {id} />}
                        } />
                        <Route  
                            path='/houses/:id' 
                            render={
                                ({match}) => {
                                    const {id} = match.params;
                                    return <HousesItem houseId = {id}/>
                        }} />
                        <Route 
                            path='/characters/:id' 
                            render={
                                ({match}) => {
                                    const {id} = match.params;
                                    return <CharactersItem charId = {id} />
                        }} />
                    </Container>
                </div> 
            </Router>
        )
    }
}