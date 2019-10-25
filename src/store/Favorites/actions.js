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

