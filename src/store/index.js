import {createStore, applyMiddleware} from "redux";
import {rootReducer, initialState} from "./reducers";
import thunk from 'redux-thunk'

const favorites = JSON.parse(localStorage.getItem('favorites'))

if(favorites) {
    initialState.favorites = favorites
}

export const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
)
store.subscribe(() => {
    localStorage.setItem('favorites', JSON.stringify(store.getState().favorites))
})