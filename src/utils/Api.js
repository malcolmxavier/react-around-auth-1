class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    getCardList() {
        return fetch(this._baseUrl + "/cards", {
            headers: this._headers
        })
            .then((res) => res.ok ? res.json() : Promise.reject(`Error!` + res.status + res.statusText))
    }
    getUserInfo() {
        return fetch(this._baseUrl + `/users/me`, {
            headers: this._headers
        })
            .then((res) => res.ok ? res.json() : Promise.reject(`Error!` + res.status + res.statusText))
    }

    addCard({ name, link }) {
        return fetch(this._baseUrl + `/cards`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify({
                name,
                link
            })
        })
            .then((res) => res.ok ? res.json() : Promise.reject(`Error!` + res.status + res.statusText))
    }
    removeCard(cardId) {
        return fetch(this._baseUrl + `/cards/` + cardId, {
            headers: this._headers,
            method: "DELETE"
        })
            .then((res) => res.ok ? res.json() : Promise.reject(`Error!` + res.status + res.statusText))
    }
    changeLikeCardStatus(cardId, like) {
        if (like) {
            return fetch(this._baseUrl + `/cards/likes/` + cardId, {
                headers: this._headers,
                method: "PUT",
                body: JSON.stringify({
                    like
                })
            })
                .then((res) => res.ok ? res.json() : Promise.reject(`Error!` + res.status + res.statusText))
        } else {
            return fetch(this._baseUrl + `/cards/likes/` + cardId, {
                headers: this._headers,
                method: "DELETE"
            })
                .then((res) => res.ok ? res.json() : Promise.reject(`Error!` + res.status + res.statusText))
        }
    }
    getCardLikeStatus(cardId) {
        return fetch(this._baseUrl + `/cards/likes/` + cardId, {
            headers: this._headers
        })
            .then((res) => res.ok ? res.json() : Promise.reject(`Error!` + res.status + res.statusText))
    };

    setUserInfo({ name, about }) {
        return fetch(this._baseUrl + `/users/me`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                name,
                about
            })
        })
            .then((res) => res.ok ? res.json() : Promise.reject(`Error!` + res.status + res.statusText))

    }
    setUserAvatar({ avatar }) {
        return fetch(this._baseUrl + `/users/me/avatar`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({ avatar })
        })
            .then((res) => res.ok ? res.json() : Promise.reject(`Error!` + res.status + res.statusText))
    }
}



export default Api