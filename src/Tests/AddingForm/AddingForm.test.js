import React from 'react'
import {AddingForm} from '../../components/AddingForm/AddingForm'
import {shallow, mount} from 'enzyme'
import Enzyme from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
Enzyme.configure({ adapter: new Adapter() });

describe('Adding Form', () => {
    const mockAdd = jest.fn();
    const initialState = {
        cityName: ''
    };
    const props = {
        addCity: mockAdd
    };
    const form = shallow(<AddingForm {...props}/>);
    describe('initial render', () => {
        it('renders properly', () => {
            expect(form).toMatchSnapshot();
        });
        it('initialize with empty city name', () => {
            expect(form.state()).toEqual(initialState);
        })
    });
    describe('changing input', () => {
        const value = 'Moscow';
        beforeEach(() => {
            form.find('input').simulate('change', {
                currentTarget: {
                    value: value
                }
            })
        });
        it('updates city name', () => {
            expect(form.state().cityName).toEqual('Moscow');
        })
    });
    describe('submitting form', () => {
        form.find('form').simulate('submit', {
            preventDefault: () => {}
        });
        it('submit by clicking enter', () => {
            expect(mockAdd).toHaveBeenCalledTimes(1);
        });
        form.find('button').simulate('click', {
            preventDefault: () => {}
        });
        it('submit by clicking on button', () => {
            expect(mockAdd).toHaveBeenCalledTimes(1);
        });
    })
});