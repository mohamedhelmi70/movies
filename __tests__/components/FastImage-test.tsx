import React from 'react';
import renderer from 'react-test-renderer';
import {FastImage} from '../../src/components';

test('renders FastImage correctly', () => {
    const tree = renderer.create(<FastImage url="https://placeholder.png" style={{width: 50, height: 50}} />).toJSON();
    expect(tree).toMatchSnapshot();
});
