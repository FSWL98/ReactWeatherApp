import React from 'react'
import Preloader from '../../components/Preloader/Preloader'
import {shallow} from 'enzyme'
import Enzyme from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
Enzyme.configure({ adapter: new Adapter() })

describe('Preloader', () => {
    it('renders correctly', () => {
        const preloader = shallow(<Preloader/>);
        expect(preloader).toMatchSnapshot();
    })
})
