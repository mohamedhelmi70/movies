import React from 'react';
import renderer from 'react-test-renderer';
import {Movie} from '../../types';
import MovieCard from '../../src/screens/Movies/MovieCard';

test('renders MovieCard correctly', () => {
    const mockCallBack = jest.fn();
    const movieItem: Movie = {
        id: 123,
        original_title: 'test',
        poster_path: '/poster.png',
        vote_average: 3,
        title: 'test',
        genre_ids: [1, 2],
        release_date: '1994-09-10',
        overview: 'overview test',
    };
    const tree = renderer.create(<MovieCard movie={movieItem} onPress={mockCallBack} />).toJSON();
    expect(tree).toMatchSnapshot();
});
