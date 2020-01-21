import React from 'react'
import App from '../../components/App/App'
import {shallow} from 'enzyme'
import Enzyme from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
    const app = shallow(<App/>);
    it('renders properly', () => {
        expect(app).toMatchSnapshot();
    });
    it('has one provider', () => {
        expect(app.find('Provider')).toHaveLength(1);
    });
    it('provider has 2 children', () => {
        expect(app.find('Provider').children()).toHaveLength(2);
    });
});