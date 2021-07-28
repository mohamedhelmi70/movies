import React from 'react';
import renderer from 'react-test-renderer';
import {Credit} from '../../types';
import CreditCard from '../../src/screens/Movie/CreditCard';

test('renders CreditCard correctly', () => {
    const creditItem: Credit = {
        id: 123,
        name: 'test',
        original_name: 'test',
        profile_path: '/profile.png',
        credit_id: 'cridet_123',
    };
    const tree = renderer.create(<CreditCard credit={creditItem} />).toJSON();
    expect(tree).toMatchSnapshot();
});
