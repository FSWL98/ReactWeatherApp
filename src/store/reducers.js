import {apiReducer, initialApiState} from "./Favorites/reducers";
import {combineReducers} from "redux";

export const rootReducer = combineReducers({
    api: apiReducer
});

export const initialState = {
    api: initialApiState
};