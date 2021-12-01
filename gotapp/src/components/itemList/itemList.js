import React, {useEffect, useState} from 'react';
import './itemList.css';
import Spinner from '../spinner';

function ItemList({renderItem, onItemSelected, getData}) {

    const [itemList, updateList] = useState([]);

    useEffect(() => {
        getData()
            .then((data) => {
               updateList(data) 
            })
    }, [])

    function renderItems (arr) {
        return arr.map((item, i) => {
            const label = renderItem(item);
            const id = i + 1;
            return (
                <li 
                    key={i}
                    className="list-group-item"
                    onClick={()=> onItemSelected(id)}
                    >
                    {label}
                </li>
            )
        })
    }

    if(!itemList) {
        return  <Spinner/>
    }

    const items = renderItems(itemList);

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}
export default ItemList;