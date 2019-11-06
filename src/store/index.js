import {createStore, applyMiddleware} from "redux";
import {rootReducer, initialState} from "./reducers";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const favorites = JSON.parse(localStorage.getItem('favorites'))

if(favorites) {
    initialState.api.items = favorites
}

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
)
store.subscribe(() => {
    const result = []
    store.getState().api.items.map((item) => {
        result.push({ name: item.name})
        }
    )
    localStorage.setItem('favorites', JSON.stringify(result))
})

export default store