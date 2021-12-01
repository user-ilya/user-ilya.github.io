'use strict'
window.addEventListener('DOMContentLoaded', () => {

    const tabs = require('./modules/tabs'),
          modal = require('./modules/modal'),
          slider = require('./modules/slider'),
          forms = require('./modules/forms'),
          timer = require('./modules/timer'),
          calc = require('./modules/calculation'),
          cards = require('./modules/cards');
    tabs();
    modal();
    slider();
    forms();
    timer();
    calc();
    cards();
    // LocalStorage (SessionStorage)
    window.localStorage.setItem('number', JSON.stringify({
        name: 'Ilya',
        female: 'Kuzmin'
    }))
    setTimeout(() => {
        console.log(JSON.parse(localStorage.getItem('number')))
    }, 5000)

})