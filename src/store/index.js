import {createStore, applyMiddleware} from "redux";
import {rootReducer, initialState} from "./reducers";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {getWeatherByCityName} from "./Favorites/actions";

const favorites = JSON.parse(localStorage.getItem('favorites'))

if(favorites) {
    initialState.favorites.favorites = favorites
    initialState.api.items = favorites
}

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
)
store.subscribe(() => {
    localStorage.setItem('favorites', JSON.stringify(store.getState().favorites.favorites))
})

export default store