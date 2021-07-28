import React from 'react';
import {View} from 'react-native';
import renderer from 'react-test-renderer';
import {Container} from '../../src/components';

test('renders Container correctly', () => {
    const tree = renderer.create(<Container children={<View />} />).toJSON();
    expect(tree).toMatchSnapshot();
});
