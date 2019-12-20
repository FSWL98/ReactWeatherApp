import {createStore, applyMiddleware} from "redux";
import {rootReducer, initialState} from "./reducers";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {receiveAllFavs} from "./Favorites/actions";

let items = [];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
);

fetch('http://localhost:3001/api/v1/favorites')
    .then(res => res.json())
    .then(json => store.dispatch(receiveAllFavs(json.data)))
    .catch(err => console.log(err));

export default store