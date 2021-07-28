import React from 'react';
import {StyleSheet} from 'react-native';
import {Movie} from '../../../types';
import {FastImage} from '../../components';
import {Text, View} from '../../components/Themed';
import Colors from '../../constants/Colors';
import {wp} from '../../constants/Layout';

interface MovieBodyProps {
    movie: Movie;
}

function MovieBody({movie}: MovieBodyProps) {
    return (
        <View style={styles.container}>
            {Boolean(movie?.poster_path) && (
                <View style={styles.posterView}>
                    <FastImage
                        url={`https://www.themoviedb.org/t/p/original${movie?.poster_path}`}
                        style={styles.poster}
                    />
                </View>
            )}
            <Text style={styles.title} weight="700" font="Roboto-Bold">
                {movie?.original_title}
            </Text>
            {movie?.vote_average && (
                <View style={{marginTop: wp('2%')}}>
                    <Text style={styles.vote} weight="700" font="Roboto-Medium" lightColor={Colors.light.primary}>
                        {movie?.vote_average * 10}%
                    </Text>
                </View>
            )}
            <View style={styles.overview}>
                <Text weight="700" font="Roboto-Bold" style={styles.subtitle}>
                    Overview
                </Text>
                <Text lightColor="#888" style={styles.paragraph}>
                    {movie?.overview}
                </Text>
            </View>
            {movie?.genres && movie?.genres?.length > 0 && (
                <View style={styles.overview}>
                    <Text weight="700" font="Roboto-Bold" style={styles.subtitle}>
                        Genres
                    </Text>
                    <View style={styles.genresView}>
                        {movie?.genres?.map((genre) => (
                            <View key={genre?.id} style={styles.genre} lightColor="#ccc">
                                <Text style={{fontSize: wp('3%')}} weight="400" font="Roboto-Light">
                                    {genre?.name}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    posterView: {
        marginBottom: wp('5%'),
    },
    poster: {
        width: wp('30%'),
        height: wp('60%'),
        borderRadius: wp('3%'),
    },
    title: {
        fontSize: wp('4.8%'),
        maxWidth: wp('80%'),
    },
    vote: {
        fontSize: wp('5%'),
    },
    overview: {
        width: wp('90%'),
        marginTop: wp('5.5%'),
    },
    paragraph: {
        marginTop: wp('2%'),
    },
    subtitle: {
        fontSize: wp('3.9%'),
    },
    genresView: {
        marginTop: wp('3%'),
        maxWidth: wp('90%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    genre: {
        borderRadius: wp('2%'),
        paddingHorizontal: wp('1.5%'),
        paddingVertical: wp('.5%'),
        marginBottom: wp('1%'),
        marginRight: wp('1%'),
    },
});

export default MovieBody;
