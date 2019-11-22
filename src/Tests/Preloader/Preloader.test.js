import React from 'react'
import Preloader from '../../components/Preloader/Preloader'
import renderer from 'react-test-renderer'

it('Preloader', () => {
    const component = renderer.create(<Preloader/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})