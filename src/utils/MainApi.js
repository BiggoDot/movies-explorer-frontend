export const BASE_URL = 'https://api.biggodot.nomoreparties.sbs';

function checkResponse (res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(res.status);
    }
}

export const register = (password, email, name) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password, email, name})
    })
        .then((res) => checkResponse(res))

};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email, password
        })
    })
        .then((res) => checkResponse(res))
};


export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then((res) => checkResponse(res))
}

export const getProfile = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    }
    })
        .then((res) => checkResponse(res))
}

export const editProfile = (name, email) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH', 
        headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, email
        })  
    })
    .then((res) => checkResponse(res))
}

export const deleteMovie = (id) => {
    return fetch(`${BASE_URL}/movies/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
            }
    })
    .then((res) => checkResponse(res))
}

export const getSavedMovie = () => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
            }
    })
    .then((res) => checkResponse(res))
}

export const saveMovie = (country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                country,
                director,
                duration,
                year,
                description,
                image,
                trailerLink,
                nameRU,
                nameEN,
                thumbnail,
                movieId,
            })
    })
    .then((res) => checkResponse(res))
}