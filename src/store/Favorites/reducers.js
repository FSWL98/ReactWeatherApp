export const ADD_FAVORITE_CITY = 'ADD_FAVORITE_CITY'
export const REMOVE_FAVORITE_CITY = 'REMOVE_FAVORITE_CITY'
export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'
export const RECEIVE_FAILED = 'RECEIVE_FAILED'
export const initialApiState = {
    items: []
}

export const apiReducer = (state = initialApiState, action) => {
    switch (action.type) {
        case ADD_FAVORITE_CITY:
            if (state.items.find((el) => el.name === action.name)) {
                alert('Этот город уже есть в списке избранных')
                return state
            }
            console.log(state)
            return {
                items: [
                    ...state.items,
                    {
                        name: action.name
                    }
                ]
            }
        case REMOVE_FAVORITE_CITY:
            return {
                items: state.items.filter((city) => city.name !== action.name)
            }
        case REQUEST_DATA:
            console.log('requested')
            console.log(state.items)
            return {
                items: state.items.map(fav =>
                    fav.name === action.name ? {...fav, isLoaded: false, isError: false} : fav
                )
            }
        case RECEIVE_DATA:
            return {
                items: state.items.map (fav =>
                    fav.name === action.name ? {...fav, isLoaded: true, isError: false, data: action.data} : fav
                )
            }
        case RECEIVE_FAILED:
            return {
                items: state.items.map (fav =>
                    fav.name === action.name ? {...fav, isLoaded: true, isError: true, data: action.message} : fav
                )
            }
        default:
            return state
    }
}