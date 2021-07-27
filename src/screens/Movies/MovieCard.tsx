import moment from 'moment';
import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import {Movie} from '../../../types';
import {Text, View} from '../../components/Themed';
import Colors from '../../constants/Colors';
import {wp} from '../../constants/Layout';

interface MovieCardProps {
    movie?: Movie;
    onPress: () => void;
}

function MovieCard({movie, onPress}: MovieCardProps) {
    return (
        <Pressable onPress={onPress} style={styles.card}>
            <View>
                {Boolean(movie?.poster_path) && (
                    <Image
                        source={{uri: `https://www.themoviedb.org/t/p/original${movie?.poster_path}`}}
                        style={styles.poster}
                        resizeMode="cover"
                    />
                )}
            </View>
            <View style={styles.cardRight}>
                <Text style={styles.cardTitle} weight="700" lightColor="#334443">
                    {movie?.original_title}
                </Text>
                <Text style={styles.date} lightColor="#888">
                    {moment(movie?.release_date).format('LL')}
                </Text>
                {movie?.genres && movie?.genres?.length > 0 && (
                    <View style={styles.genresView}>
                        {movie?.genres?.map((genre) => (
                            <View key={genre?.id} style={styles.genre} lightColor="#ccc">
                                <Text style={{fontSize: wp('2.9%')}} weight="400" font="Roboto-Light">
                                    {genre?.name}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
                {movie?.vote_average && (
                    <View style={{marginTop: wp('2%'), width: wp('60%')}}>
                        <Text style={styles.vote} weight="700" font="Roboto-Medium" lightColor={Colors.light.primary}>
                            {movie?.vote_average * 10}%
                        </Text>
                    </View>
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: wp('90%'),
        alignSelf: 'center',
        marginBottom: wp('4%'),
        padding: wp('4%'),
        borderRadius: wp('2%'),
        backgroundColor: '#fff',

        flexDirection: 'row',

        shadowColor: '#888',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    poster: {
        width: wp('18%'),
        height: wp('28%'),
        borderRadius: wp('3%'),
    },
    cardRight: {
        marginLeft: wp('4%'),
    },
    cardTitle: {
        fontSize: wp('4.5%'),
        maxWidth: wp('60%'),
    },
    date: {
        marginTop: wp('2%'),
        fontSize: wp('3.5%'),
    },
    genresView: {
        marginTop: wp('3%'),
        maxWidth: wp('60%'),
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
    vote: {
        alignSelf: 'flex-end',
        fontSize: wp('4.3%'),
    },
});

export default MovieCard;
