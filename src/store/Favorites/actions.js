import store from '../index'
export const ADD_FAVORITE_CITY = 'ADD_FAVORITE_CITY'
export const REMOVE_FAVORITE_CITY = 'REMOVE_FAVORITE_CITY'
export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'
export const RECEIVE_FAILED = 'RECEIVE_FAILED'

const parseData = data => ({
    lon: data.coord.lon,
    lat: data.coord.lat,
    icon: data.weather[0].icon,
    cloudiness: data.weather[0].description,
    temp: Math.round(data.main.temp - 273.15),
    humidity: data.main.humidity,
    wind: data.wind.speed,
    pressure: data.main.pressure
});

export const addFavoriteCity = name => ({
    type: ADD_FAVORITE_CITY,
    name
})

export const removeFavoriteCity = name => ({
    type: REMOVE_FAVORITE_CITY,
    name
})

export const requestData = name => ({
    type: REQUEST_DATA,
    name
})

export const receiveData = (name, data) => ({
    type: RECEIVE_DATA,
    name,
    data
})

export const receiveFailed = (name, message) => ({
    type: RECEIVE_FAILED,
    name,
    message
})

export const getWeatherByCityName = cityName => {
    store.dispatch(requestData(cityName))
    return function (dispatch, getState) {
        return fetch('https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=' + cityName +
            '&appid=b88ae6b1211078df478d7544a65d22f9')
            .then(res => res.json())
            .then(json => {
                if (json.cod === "404")
                    dispatch(receiveFailed(cityName, json.message))
                else
                    dispatch(receiveData(cityName, parseData(json)))
            })
            .catch(json => dispatch(receiveFailed(cityName, json)))
    }
}
