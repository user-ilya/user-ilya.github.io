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