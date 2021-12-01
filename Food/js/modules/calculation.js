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