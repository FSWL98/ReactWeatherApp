export const ADD_FAVORITE_CITY = 'ADD_FAVORITE_CITY'
export const REMOVE_FAVORITE_CITY = 'REMOVE_FAVORITE_CITY'
export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'

export const addFavoriteCity = name => ({
    type: ADD_FAVORITE_CITY,
    name
})

export const removeFavoriteCity = name => ({
    type: REMOVE_FAVORITE_CITY,
    name
})

const requestData = name => ({
    type: REQUEST_DATA,
    name
})

export const receiveData = (name, data) => ({
    type: RECEIVE_DATA,
    name,
    data
})

export function fetchData(name) {
    return function(dispatch) {
        dispatch(requestData(name))
        return fetch('https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=' + name +
            '&appid=b88ae6b1211078df478d7544a65d22f9')
            .then(response => response.json(),
                error => console.log('Error! ', error))
            .then(data => dispatch(receiveData(name, data)))
    }
}