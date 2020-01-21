export const ADD_FAVORITE_CITY = 'ADD_FAVORITE_CITY';
export const REMOVE_FAVORITE_CITY = 'REMOVE_FAVORITE_CITY';
export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const RECEIVE_FAILED = 'RECEIVE_FAILED';
export const RECEIVE_ALL = 'RECEIVE_ALL';
export const initialApiState = {
    items: []
};

export const apiReducer = (state = initialApiState, action) => {
    switch (action.type) {
        case ADD_FAVORITE_CITY:
            if (state.items.find((el) => el.name.toLowerCase() === action.name.toLowerCase())) {
                alert('Этот город уже есть в списке избранных');
                return state
            }
            const newCity = {
                name: action.name
            };
            fetch('http://localhost:3001/api/v1/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(newCity)
            })
                .catch(err => console.log(err));
            return {
                items: [
                    ...state.items,
                    {
                        name: action.name
                    }
                ]
            };
        case REMOVE_FAVORITE_CITY:
            fetch(`http://localhost:3001/api/v1/favorites/${action.name}`, {
                method: 'DELETE'
            })
                .catch(err => console.log(err));
            return {
                items: state.items.filter((city) => city.name !== action.name)
            };
        case REQUEST_DATA:
            return {
                items: state.items.map(fav =>
                    fav.name === action.name ? {...fav, isLoaded: false, isError: false} : fav
                )
            };
        case RECEIVE_DATA:
            return {
                items: state.items.map (fav =>
                    fav.name === action.name ? {...fav, isLoaded: true, isError: false, data: action.data} : fav
                )
            };
        case RECEIVE_FAILED:
            return {
                items: state.items.map (fav =>
                    fav.name === action.name ? {...fav, isLoaded: true, isError: true, data: action.message} : fav
                )
            };
        case RECEIVE_ALL:
            return {
              items: action.favs
            };
        default:
            return state
    }
};