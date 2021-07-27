import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import React from 'react';
import {FlatList, Pressable, StyleSheet} from 'react-native';
import {Genre, Movie, RootParamList} from '../../../types';
import {Container} from '../../components';
import {Text, View} from '../../components/Themed';
import Colors from '../../constants/Colors';
import {wp} from '../../constants/Layout';
import {useStore} from '../../contexts/StoreContext';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import MovieCard from './MovieCard';

interface MoviesProps {
    navigation: StackNavigationProp<RootParamList, 'Movies'>;
}

function Movies({navigation}: MoviesProps) {
    const isMountedRef = useIsMountedRef();
    const [tab, setTab] = React.useState<'upcoming' | 'top_rated' | 'popular'>('upcoming');
    const [page, setPage] = React.useState<number>(1);
    const [movies, setMovies] = React.useState<Movie[]>([]);
    const {genres} = useStore();

    const getMovies = React.useCallback(async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${tab}?api_key=4f298a53e552283bee957836a529baec&language=en-US&page=${page}`,
            );
            const moviesWithGenres: Movie[] = [];
            if (response?.data?.results?.length > 0) {
                for (const movie of response?.data?.results) {
                    const movieWithGenres: Movie = {
                        ...movie,
                        genres: genres?.filter((genre: Genre) => movie?.genre_ids?.includes(genre?.id)),
                    };
                    moviesWithGenres.push(movieWithGenres);
                }
                if (isMountedRef?.current) {
                    setMovies(moviesWithGenres);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef, tab, page, genres]);

    React.useEffect(() => {
        getMovies();
    }, [getMovies]);

    return (
        <Container style={styles.container}>
            <View style={styles.tabs}>
                <Pressable
                    onPress={tab !== 'upcoming' ? () => setTab('upcoming') : undefined}
                    style={[styles.tab, tab === 'upcoming' ? styles.activeTab : {}]}>
                    <Text
                        lightColor={tab === 'upcoming' ? '#FFF' : '#000'}
                        style={styles.tabText}
                        weight="700"
                        font="Roboto-Medium">
                        Upcoming
                    </Text>
                </Pressable>
                <Pressable
                    onPress={tab !== 'popular' ? () => setTab('popular') : undefined}
                    style={[styles.tab, tab === 'popular' ? styles.activeTab : {}]}>
                    <Text
                        lightColor={tab === 'popular' ? '#FFF' : '#000'}
                        style={styles.tabText}
                        weight="700"
                        font="Roboto-Medium">
                        Popular
                    </Text>
                </Pressable>
                <Pressable
                    onPress={tab !== 'top_rated' ? () => setTab('top_rated') : undefined}
                    style={[styles.tab, tab === 'top_rated' ? styles.activeTab : {}]}>
                    <Text
                        lightColor={tab === 'top_rated' ? '#FFF' : '#000'}
                        style={styles.tabText}
                        weight="700"
                        font="Roboto-Medium">
                        Top Rated
                    </Text>
                </Pressable>
            </View>
            <FlatList
                style={{flex: 1, width: '100%'}}
                data={movies}
                contentContainerStyle={{justifyContent: 'flex-start', paddingVertical: wp('5%')}}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item?.id.toString()}
                onEndReachedThreshold={0.2}
                renderItem={({item}) => (
                    <MovieCard
                        movie={item}
                        onPress={() => navigation.navigate('Movie', {movieId: item?.id, movie: item})}
                    />
                )}
            />
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    tabs: {
        marginTop: wp('2%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp('100%'),
        paddingHorizontal: wp('5%'),
        paddingBottom: wp('2%'),
    },
    tab: {
        width: wp('28%'),
        borderRadius: wp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd',
        paddingVertical: wp('2.5%'),
    },
    activeTab: {
        backgroundColor: Colors.light.primary,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tabText: {
        fontSize: wp('4%'),
    },
});

export default Movies;
