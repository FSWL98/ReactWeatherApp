import {apiReducer, initialApiState, favoritesReducer, initialFavoritesState} from "./Favorites/reducers";
import {combineReducers} from "redux";

export const rootReducer = combineReducers({
    favorites: favoritesReducer,
    api: apiReducer
})

export const initialState = {
    favorites: initialFavoritesState,
    api: initialApiState
}