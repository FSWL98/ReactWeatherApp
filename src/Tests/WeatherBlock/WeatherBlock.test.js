import React from 'react'
import WeatherBlockInfo from '../../components/WeatherBlock/WeatherBlockInfo'
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
describe('WeatherBlockInfo', () => {
    const weatherBlock = shallow(<WeatherBlockInfo data={data}/>)
    it('renders properly', () => {
        expect(weatherBlock).toMatchSnapshot()
    });
    it('renders 5 li elements', () => {
        expect(weatherBlock.find('li')).toHaveLength(5);
    });
    it('renders text from data object', () => {
        expect(weatherBlock.find('span').first().text()).toEqual('4 м/с')
    })
})