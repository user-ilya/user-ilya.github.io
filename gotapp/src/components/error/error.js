import React from 'react';
import img from '../error/img.jpg';
const ErrorMassage = () => {
    return (
        <>
        <img src={img} alt='Hello'></img>
        <span>Something goes wrong :(</span>
    </>
    )
}
export default ErrorMassage;