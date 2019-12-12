import React from 'react'
import {Favorites} from '../../components/Favorites/Favorites'
jest.mock('../../components/AddingForm/AddingForm', () => () => <div id='mockedForm'>mockedForm</div>);
jest.mock('../../components/FavoritesItem/FavoritesItem', () => () =>  <div className='mockedItem'>mockedItem</div>);
import {shallow, render} from 'enzyme'
import Enzyme from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
Enzyme.configure({ adapter: new Adapter() });
const data = [
    {
        data: {
            lon: 86.09,
            lat: 55.36,
            icon: "13n",
            cloudiness: "light snow",
            temp: 1,
            humidity: 80,
            wind: 4,
            pressure: 1014
        },
        isError: false,
        isLoaded: true,
        name: 'Stavropol'
    },
    {
        data: {
            lon: 86.09,
            lat: 55.36,
            icon: "04n",
            cloudiness: "overcast clouds",
            temp: -8,
            humidity: 85,
            wind: 4,
            pressure: 1013
        },
        isError: false,
        isLoaded: true,
        name: 'Kemerovo'
    }
];
describe('Favorites', () => {
    const mockRemove = jest.fn();
    const props = {
        favorites: data,
        removeCity: mockRemove
    };
    jest.mock('../../components/AddingForm/AddingForm', () => () => <div id='mockedForm'>mockedForm</div>);
    jest.mock('../../components/FavoritesItem/FavoritesItem', () => <div id='mockedItem'>mockedItem</div>);
    describe('initial render', () => {
        const favorites = shallow(<Favorites {...props}/>);
        it('renders properly', () => {
            expect(favorites).toMatchSnapshot();
        });
    });
    describe('renders other components properly', () => {
        const newProps = {
            ...props,
          favorites: data
        };
        const favorites = mount(<Favorites {...newProps}/>);
        it('has one adding form', () => {
            expect(favorites.find('#mockedForm')).toHaveLength(1);
        });
        it('has two favorite items', () => {
            expect(favorites.find('div.mockedItem')).toHaveLength(2);
        });
    });
});