import React from 'react'
import WeatherHere from '../../components/WeatherHere/WeatherHere'
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
    pressure: 1015,
    name: 'Stavropol'
};
describe('Weather Here', () => {
    const initialState = {
        isLoaded: false,
        data: null,
        cityName: 'Moscow'
    };
    const weatherHere = shallow(<WeatherHere/>)
    it('renders properly', () => {
        expect(weatherHere).toMatchSnapshot();
    });
    it('initialize with initial state', () => {
        expect(weatherHere.state()).toEqual(initialState);
    });
    it('renders preloader', () => {
        expect(weatherHere.find('Preloader')).toHaveLength(1);
    });
    describe('Loaded weather here component', () => {
        beforeEach(() => {
            weatherHere.setState({
                    isLoaded: true,
                    data: data
                }
            );
        });
        it('renders properly', () => {
           expect(weatherHere).toMatchSnapshot();
        });
        it('renders with one weather here main' ,() => {
            expect(weatherHere.find('WeatherHereMain')).toHaveLength(1);
        });
        it('renders with one weather block info', () => {
            expect(weatherHere.find('WeatherBlockInfo')).toHaveLength(1);
        });
    })

});