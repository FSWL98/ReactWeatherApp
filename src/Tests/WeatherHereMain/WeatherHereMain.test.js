import React from 'react'
import WeatherHereMain from '../../components/WeatherHere/WeatherHereMain'
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

describe('WeatherHereMain', () => {
    const weatherHereMain = shallow(<WeatherHereMain data={data}/>)
    it('renders properly', () => {
        expect(weatherHereMain).toMatchSnapshot();
    });
    it('renders with one section', () => {
        expect(weatherHereMain.find('section')).toHaveLength(1);
    });
    it('renders with one div', () => {
        expect(weatherHereMain.find('div')).toHaveLength(1);
    });
    it('has name Stavropol in h4', () => {
        expect(weatherHereMain.find('h4').text()).toEqual('Stavropol');
    })
});