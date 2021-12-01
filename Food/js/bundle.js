/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculation.js":
/*!***********************************!*\
  !*** ./js/modules/calculation.js ***!
  \***********************************/
/***/ ((module) => {

function calc () {
    const totalCal = document.querySelector('.calculating__result span');
    let active, sex, height, weight, age;

    if (localStorage.getItem('sex')) {
       sex = localStorage.getItem('sex')
    } else {
        sex = 'female'
        localStorage.setItem('sex', 'female');
    }
    if (localStorage.getItem('active')) {
        active = localStorage.getItem('active')
    } else {   
        active = +document.querySelector('.calculating__choose_big div').getAttribute('data-active');
        localStorage.setItem('active',  +document.querySelector('.calculating__choose_big div').getAttribute('data-active'))
    }

    function initCalc (selector, classActive) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((item) => {
            item.classList.remove(classActive);

            if (item.getAttribute('id') === localStorage.getItem('sex')) {
                item.classList.add(classActive)
            }
            if (item.getAttribute('data-active') === localStorage.getItem('active')) {
                item.classList.add(classActive)
            }
        })
    }
    initCalc('#gender div', 'calculating__choose-item_active');
    initCalc('.calculating__choose_big div', 'calculating__choose-item_active')

    function calculationTotal() {
        if (!sex || !age || !weight || !height || !active) {
            totalCal.textContent = '----';
            return;
        }

        if (sex === 'male') {
            totalCal.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * active);
        } else {
            totalCal.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * active);
        }
        return totalCal.textContent
    }

    function getStaticInfo(selector, classActive) {
        const elementsActive = document.querySelectorAll(selector);
        elementsActive.forEach((element) => {
            element.addEventListener('click', (e)=> {
                if (e.target.getAttribute('data-active')) {
                    active = +e.target.getAttribute('data-active');
                    localStorage.setItem('active', +e.target.getAttribute('data-active'))
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                elementsActive.forEach((element) => {
                    element.classList.remove(classActive)
                })
                e.target.classList.add(classActive);

                calculationTotal();
            })
        })
    }
    function getDynamicInfo(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', (e)=> {
            if (input.value.match(/\D/g)) {
                input.style.boxShadow = '0 4px 15px red'
            } else {
                input.style.boxShadow = '0 4px 15px rgba(0, 0, 0, .2)'
            } 

           switch ( e.target.getAttribute('id')) {
               case 'weight': 
                   weight = +e.target.value;
                   break;
               case 'age': 
                    age = +e.target.value;
                    break;
               case 'height': 
                   height = +e.target.value;
                   break;
            }
           
           calculationTotal();
        })
    }
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');
    getStaticInfo('#gender div', 'calculating__choose-item_active');
    getDynamicInfo('#height');
    getDynamicInfo('#age');
    getDynamicInfo('#weight');
    calculationTotal();
}
module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function menuCards () {
    // class Menu

    class MenuCard {
        constructor(src, title, descr, price, alt, parentSelector, ...classes) {
            this.src = src;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.alt = alt;
            this.dollar = 75;
            this.parentItem = document.querySelector(parentSelector);
            this.classes = classes;
            this.changeToRub();
        }
        changeToRub() {
            this.price = this.dollar * this.price
        }

        render() {
            const card = document.createElement('div');
            if (this.classes = []) {
                this.classes = ['menu__item']
            }
            this.classes.forEach((className) => card.classList.add(className))
            card.innerHTML = `
        <img src=${this.src} alt="vegy">
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
        </div>
`
            this.parentItem.append(card)
        }
    }
    const getResourse = async (url) => {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
        return await res.json()
    }

    getResourse('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, title, descr, price, altimg, '.menu .container').render()
            })
        })
}
module.exports = menuCards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms () {
    const forms = document.querySelectorAll('form');
    const messageChange = {
        loading: 'img/spinner.svg',
        error: 'Что-то пошло не так',
        success: 'Ваш запрос отправлен. Мы вам перезвоним'
    };
    forms.forEach(item => {
        bindPostData(item)
    })
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        })
        return await res.json();
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const message = document.createElement('img');
            message.src = messageChange.loading;
            message.style.cssText = `
    display: block;
    margin: 0 auto
`
            form.append(message)

            const obj = {}

            const formDate = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formDate.entries(obj)))
            postData('http://localhost:3000/requests', json)
                .then(response => {
                    console.log(response);
                    showThanksModal(messageChange.success);
                    message.remove();
                }).catch(() => {
                    showThanksModal(messageChange.error)
                }).finally(() => {
                    form.reset();
                });
        })
    }

    function showThanksModal(message) {
        const prevModal = document.querySelector('.modal__dialog');
        prevModal.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
<div class = 'modal__content'>
<div data-close class='modal__close'>&times;</div>
<p class ='modal__title'>${message}</p>
</div>
`;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModal.classList.remove('hide');
            prevModal.classList.add('show');
            closeModal()
        }, 4000)
    }

    fetch('http://localhost:3000/menu')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(() => console.log(Error.name))
}
module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal () {
    const btnModalOpen = document.querySelectorAll('[data-modal]'),
        windowModal = document.querySelector('.modal');


    function closeModal() {
        windowModal.classList.remove('modal_active')
        document.body.style.overflow = 'auto'
    }

    function openModal() {
        windowModal.classList.add('modal_active')
        document.body.style.overflow = 'hidden'
        clearInterval(openModalTime)
    }

    function showModalTab() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalTab)
        }

    }

    btnModalOpen.forEach((item) => {
        item.addEventListener('click', openModal)
    });

    windowModal.addEventListener('click', (e) => {
        if (e.target === windowModal || e.target.getAttribute('data-close') == '') {
            closeModal()
        }
    })
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && windowModal.classList.contains('modal_active')) {
            closeModal()

        }
    })


    window.addEventListener('scroll', showModalTab)
    const openModalTime = setTimeout(openModal, 10000)
}
module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider () {
    // slider
    const slides = document.querySelectorAll('.offer__slide'),
        prevSlide = document.querySelector('.offer__slider-prev'),
        nextSlide = document.querySelector('.offer__slider-next'),
        total = document.getElementById('total'),
        currentSlide = document.getElementById('current'),
        slider = document.querySelector('.offer__slider');

    let current = 1;
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length
    }

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    slider.append(indicators)

    const dots = [];
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1)
        if (i == 0) {
            dot.style.opacity = 1
        }
        indicators.append(dot)
        dots.push(dot)
    }

    nextSlide.addEventListener('click', () => {
        current += 1;
        if (current > slides.length) {
            current = 1;
        }
        counterSlidesChecked()
        dotsToSlides(dots)
        showSlide(current)
    })
    prevSlide.addEventListener('click', () => {
        current -= 1;
        if (current < 1) {
            current = slides.length;
        }
        counterSlidesChecked()
        dotsToSlides(dots)
        showSlide(current)
    })
    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to')
            current = slideTo;
            counterSlidesChecked()
            showSlide(current)
            dotsToSlides(dots)
        })
    })

    function counterSlidesChecked() {
        if (slides.length < 10) {
            currentSlide.textContent = `0${current}`
        } else {
            currentSlide.textContent = `${current}`
        }
    }

    function dotsToSlides(dots) {
        dots.forEach((dot) => dot.style.opacity = 0.5);
        dots[current - 1].style.opacity = 1;
    }

    function showSlide(index) {
        slides.forEach((slide) => slide.classList.add('hide'))
        slides[index - 1].classList.remove('hide')
        slides[index - 1].classList.add('show')
    }
    showSlide(current)
}
module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs () {
     // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
    tabsContent.forEach((item) => {
        item.classList.add('hide')
        item.classList.remove('show', 'fade')
        })
    tabs.forEach((item) => {
        item.classList.remove('tabheader__item_active')
        })  
    }

    function showTabContent(idx = 0) {
        tabsContent[idx].classList.add('show', 'fade')
        tabsContent[idx].classList.remove('hide')
        tabs[idx].classList.add('tabheader__item_active')
    }
    hideTabContent()
    showTabContent()

    tabsParent.addEventListener('click', (event) => {
    const target = event.target
    if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, idx) => {
            if (target === item) {
                hideTabContent()
                showTabContent(idx)
            }
        })
    }
    })
}
module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer () {
    const deadline = '2022-09-27';

    function getTimeRemaining(lasttime) {
        const t = Date.parse(lasttime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / 1000) % 60)
        return {
            t,
            days,
            hours,
            minutes,
            seconds
        }
    }

    function setTimer(selector, lasttime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            isTimer = setInterval(updateTimer, 1000)

        updateTimer()

        function updateTimer() {
            const total = getTimeRemaining(lasttime)


            days.innerHTML = zeroTimer(total.days);
            hours.innerHTML = zeroTimer(total.hours);
            minutes.innerHTML = zeroTimer(total.minutes);
            seconds.innerHTML = zeroTimer(total.seconds);

            if (total.t <= 0) {
                clearInterval(isTimer)
                zeroTimer()
            }
        }
    }

    function zeroTimer(num) {
        if (num < 10) {
            return `0${num}`
        }
        return num
    }
    setTimer('.timer', deadline)
}
module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/

window.addEventListener('DOMContentLoaded', () => {

    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          calc = __webpack_require__(/*! ./modules/calculation */ "./js/modules/calculation.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
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
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map