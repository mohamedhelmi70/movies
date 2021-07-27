import {RouteProp} from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import {StyleSheet, FlatList, ScrollView} from 'react-native';
import {Credit, RootParamList} from '../../../types';
import {Container, FastImage} from '../../components';
import {Text, View} from '../../components/Themed';
import Colors from '../../constants/Colors';
import {wp} from '../../constants/Layout';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import CreditCard from './CreditCard';

interface MovieScreenProps {
    route: RouteProp<RootParamList, 'Movie'>;
}

function MovieScreen({route}: MovieScreenProps) {
    const isMountedRef = useIsMountedRef();
    const [credits, setCredits] = React.useState<Credit[]>([]);

    const getCredits = React.useCallback(async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${route?.params?.movieId}/credits?api_key=4f298a53e552283bee957836a529baec&language=en-US`,
            );
            if (isMountedRef?.current) {
                setCredits(response?.data?.cast);
            }
        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef, route?.params?.movieId]);

    React.useEffect(() => {
        getCredits();
    }, [getCredits]);

    const movie = route?.params?.movie;

    return (
        <Container style={styles.container}>
            <ScrollView
                contentContainerStyle={{justifyContent: 'flex-start', alignItems: 'center'}}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{flex: 1, width: '100%'}}>
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
                    <Text weight="700" style={styles.subtitle}>
                        Overview
                    </Text>
                    <Text lightColor="#888" style={styles.paragraph}>
                        {movie?.overview}
                    </Text>
                </View>
                {movie?.genres && movie?.genres?.length > 0 && (
                    <View style={styles.overview}>
                        <Text weight="700" style={styles.subtitle}>
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
                {credits && credits?.length > 0 && (
                    <View style={styles.overview}>
                        <Text weight="700" style={styles.subtitle}>
                            Credits
                        </Text>
                    </View>
                )}
                {credits && credits?.length > 0 && (
                    <FlatList
                        style={{flex: 1, width: '100%', marginTop: wp('4%')}}
                        data={credits}
                        horizontal
                        contentContainerStyle={{justifyContent: 'flex-start', paddingHorizontal: wp('5%')}}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item?.credit_id.toString()}
                        onEndReachedThreshold={0.2}
                        renderItem={({item}) => <CreditCard credit={item} />}
                    />
                )}
            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
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

export default MovieScreen;
