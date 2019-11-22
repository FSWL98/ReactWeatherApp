import React from 'react'
import FavoritesItem from '../../components/FavoritesItem/FavoritesItem'
import {shallow, configure, mount} from 'enzyme'
import configureStore from 'redux-mock-store'
import Adapter from 'enzyme-adapter-react-16'
import {Provider} from "react-redux";
import {act, create} from 'react-test-renderer'
import Preloader from "../../components/Preloader/Preloader";
import store from '../../store/index'

configure({ adapter: new Adapter()});

const data = {
    lon: 86.09,
    lat: 55.36,
    icon: "13n",
    cloudiness: "light snow",
    temp: 1,
    humidity: 80,
    wind: 4,
    pressure: 1015
}

describe('FavoritesItem smart component loading', () => {
    const initialState = [{
        name: 'Kemerovo',
        isLoaded: false
    }];
    const mockStore = configureStore();
    let store, container;

    beforeEach(() => {
        store = mockStore(initialState);
        container = mount(<Provider store={store}><FavoritesItem/></Provider>)
    });

    it('render the smart component correctly', () => {
        let component = null
        act(() => {
            component = create(
                <Provider store={store}>
                    <FavoritesItem key={'Kemerovo'} name={'Kemerovo'} buttonRemove={() => {}}/>
                </Provider>
            )
        })
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('check props to match initial state', () => {
        expect(container.find(FavoritesItem).prop('response')).toEqual(initialState);
    })
})