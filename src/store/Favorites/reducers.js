import {ADD_FAVORITE_CITY, REMOVE_FAVORITE_CITY, RECEIVE_DATA, REQUEST_DATA} from "./actions";

export const initialFavoritesState = {
    favorites: []
}

const parseData = data => ({
    lon: data.coord.lon,
    lat: data.coord.lat,
    icon: data.weather[0].icon,
    cloudiness: data.weather[0].description,
    temp: Math.round(data.main.temp - 273.15),
    humidity: data.main.humidity,
    wind: data.wind.speed,
    pressure: data.main.pressure
})

export function favoritesReducer (state = initialFavoritesState, action) {
    switch (action.type) {
        case ADD_FAVORITE_CITY:
            if (state.favorites.find((el) => el.name === action.name))
                return state
            return {
                favorites: [
                    ...state.favorites,
                    {
                        name: action.name
                    }
                ]
            }
        case REMOVE_FAVORITE_CITY:
            console.log('removed')
            return {
                favorites: state.favorites.filter((city) => city.name !== action.name)
            }
        default:
            return state
    }
}

export const initialApiState = {}

export const apiReducer = (state = initialApiState, action) => {
    switch (action.type) {
        case RECEIVE_DATA:
            console.log(action)
            state[action.name] = parseData(action.data)
            return state
        default:
            return state
    }
}