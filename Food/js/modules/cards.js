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

    getResourse('https://user-ilya.github.io/Food/db.json')
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
export default menuCards;