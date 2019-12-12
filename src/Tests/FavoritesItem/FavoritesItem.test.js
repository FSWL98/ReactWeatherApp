import React from 'react'
import {FavoritesItem} from '../../components/FavoritesItem/FavoritesItem'
import {shallow} from 'enzyme'
import Enzyme from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
Enzyme.configure({ adapter: new Adapter() });
const data = {
    lon: 86.09,
    lat: 55.36,
    icon: "13n",
    cloudiness: "light snow",
    temp: 1,
    humidity: 80,
    wind: 4,
    pressure: 1015
};

describe('Favorites item', () => {
    describe('initial render', () => {
        const mockGetWeather = jest.fn();
        const mockRemove = jest.fn();
        const props = {
            name: 'Stavropol',
            response: {
                isLoaded: false,
                isError: false,
                data: null
            },
            buttonRemove: mockRemove,
            getWeatherByCityName: mockGetWeather
        };
        const favoriteItem = shallow(<FavoritesItem {...props}/>);
        it('renders properly', () => {
            expect(favoriteItem).toMatchSnapshot();
        });

        it('dispatches \'getWeatherByCityName\' method', () => {
            expect(mockGetWeather).toHaveBeenCalledTimes(1);
        });
        it('renders preloader', () => {
            expect(favoriteItem.find('Preloader')).toHaveLength(1);
        });
    });
    describe('loaded with error', () => {
        const mockGetWeather = jest.fn();
        const mockRemove = jest.fn();
        const newProps = {
            name: 'sdfgsd',
            response: {
                isLoaded: true,
                isError: true,
                data: null
            },
            buttonRemove: mockRemove,
            getWeatherByCityName: mockGetWeather
        };
        const favoritesItem = shallow(<FavoritesItem {...newProps}/>)
        it('renders properly', () => {
            expect(favoritesItem).toMatchSnapshot();
        });
        it('renders error block', () => {
            expect(favoritesItem.find('h5').text()).toEqual('Город sdfgsd не найден');
        });
        it('calls \'button remove\' by clicking on button', () => {
            favoritesItem.find('button').simulate('click', {
                preventDefault: () => {}
            });
            expect(mockRemove).toHaveBeenCalledTimes(1);
        })
    });
    describe('loaded without error', () => {
        const mockGetWeather = jest.fn();
        const mockRemove = jest.fn();
        const newProps = {
            name: 'Stavropol',
            response: {
                isLoaded: true,
                isError: false,
                data: data
            },
            buttonRemove: mockRemove,
            getWeatherByCityName: mockGetWeather
        };
        const favoriteItem = shallow(<FavoritesItem {...newProps}/>);
        it('renders properly', () => {
            expect(favoriteItem).toMatchSnapshot();
        });
        it('calls \'button remove\' by clicking on delete button', () => {
           favoriteItem.find('button.delete').simulate('click', {
               preventDefault: () => {}
           });
           expect(mockRemove).toHaveBeenCalledTimes(1);
        });
        it('calls \'get weather\' by clicking on update button', () => {
            favoriteItem.find('button.update').simulate('click', {
                preventDefault: () => {}
            });
            expect(mockGetWeather).toHaveBeenCalledTimes(2);
        });
        it('has proper fields', () => {
            console.log(favoriteItem);
            expect(favoriteItem.find('h5').text()).toEqual('Stavropol');
            expect(favoriteItem.find('WeatherBlockInfo')).toHaveLength(1);
        })
    });

});