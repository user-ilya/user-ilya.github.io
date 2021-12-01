import React, {Component} from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import "../app/app.css";
import '../post-add-form/post-add-form.css';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data : [
                {label: 'Go to learn React', important: false , id: 1, like: false},
                {label: 'That is so good', important: false , id: 2, like: false},
                {label: 'React is very good libs', important: false , id: 3, like: false},
                {label: 'What is your name ?', important: false , id: 4, like: false}
            ], 
            term: '', 
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLike = this.onToggleLike.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        this.maxId = 5;
    }

    onToggleImportant(id) {
        this.setState(({data}) => {
            const index =  data.findIndex((item) => item.id ===id);

            const indexItem = data[index];

            const newItem = {...indexItem, important: !indexItem.important};

            const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArray
            }
        });
    }

    onToggleLike(id) {
        this.setState(({data}) => {
            const index = data.findIndex(item => item.id ===id),
                  indexItem = data[index],
                  newItem = {...indexItem, like: !indexItem.like},
                  newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
                
            return {
                data: newArr
            }
        });
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex((elem) => {
                return elem.id === id 
            })

            const before = data.slice(0, index);
            const after = data.slice(index+1);
            const newArr = [...before, ...after];

            return {
                data: newArr
            }
        })
    };

    addItem (body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        } 
        this.setState(({data}) => {
            const newArray = [...data, newItem];
            return {
                data: newArray
            }
        })
    };

    searchPost (items, term) {
        if (term.length === 0) {
            return items
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1
        });
    }

    onUpdateSearch(term) {
        this.setState({term}) 
    }

    filterPost (items, filter) {
        if (filter === 'like') {
            return items.filter((item) => {
                return item.like
            })
        } else {
            return items
        }
    } 
    
    onFilterSelect(filter) {
        this.setState({filter})
    }

    render () {
        const {data, term, filter} = this.state;
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;
        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);
        

        return (
            <div className='app'>
                <AppHeader 
                    liked = {liked} 
                    allPosts = {allPosts} 
                />
                <div className='search-panel d-flex'>
                    <SearchPanel 
                        onUpdateSearch = {this.onUpdateSearch}/>
                    <PostStatusFilter
                        filter = {filter}
                        onFilterSelect = {this.onFilterSelect}
                        />
                </div>
                <PostList 
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant = {this.onToggleImportant}
                    onToggleLike = {this.onToggleLike}
                />
                <PostAddForm
                    onAdd={this.addItem}
                    />
            </div>  
        ) 
    }

};


