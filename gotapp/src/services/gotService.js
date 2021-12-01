
export default class gotService  {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResourse = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if(!res.ok) {
            throw new Error(`Could not fetch ${res}` + 
                `received ${res.status}`);
        }
        return await res.json()
    }

    getAllCharacters = async () => {
        const res = await this.getResourse('/characters?page=1&pageSize=10')
        return res.map(this._transformChar);
    }

    getCharacter = async (id) =>  {
        const char = await this.getResourse(`/characters/${id}`)
        return this._transformChar(char);
    }

    getAllHouses = async () => {
        const res = await this.getResourse('/houses?page=1&pageSize=10')
        return res.map(this._transformHouse);
    }

    getHouse = async (id) => {
        const house = await this.getResourse(`/houses/${id}`) 
        return this._transformHouse(house) ;
    }

    getAllBooks = async () => {
        const res = await this.getResourse('/books?page=1&pageSize=10')
        return res.map(this._transformBook) ;
    }

    getBook = async (id) => {
        const book = await this.getResourse(`/books/${id}`)
        return this._transformBook(book);
    }

    isSet = (data) => {
        if (data) {
            return data
        } else {
            return 'no data :('
        }
    }

    _transformChar = (resolve) => {
        return {
            name: this.isSet(resolve.name),
            gender: this.isSet(resolve.gender),
            born: this.isSet(resolve.born),
            died: this.isSet(resolve.died),
            culture: this.isSet(resolve.culture)  
        }
    }
    _transformHouse = (resolve) => {
        return {
            name: this.isSet(resolve.name),
            region: this.isSet(resolve.region),
            coatOfArms: this.isSet(resolve.coatOfArms),
            words: this.isSet(resolve.words),
            titles: this.isSet(resolve.titles)
        }
    }

    _transformBook = (resolve) =>  {
        return {
            name: this.isSet(resolve.name),
            authors:this.isSet(resolve.authors),
            numberOfPage: this.isSet(resolve.numberOfPage),
            country: this.isSet(resolve.country),
            publisher: this.isSet(resolve.publisher)
        }
    }
}

