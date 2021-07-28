import {RouteProp} from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import {StyleSheet, FlatList, ScrollView} from 'react-native';
import {Credit, RootParamList} from '../../../types';
import {Container} from '../../components';
import {Text, View} from '../../components/Themed';
import {wp} from '../../constants/Layout';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import CreditCard from './CreditCard';
import MovieBody from './MovieBody';

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

    return (
        <Container style={styles.container}>
            <ScrollView
                contentContainerStyle={{justifyContent: 'flex-start', alignItems: 'center'}}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{flex: 1, width: '100%'}}>
                <MovieBody movie={route?.params?.movie} />
                {credits && credits?.length > 0 && (
                    <View style={styles.credit}>
                        <Text weight="700" font="Roboto-Bold" style={styles.subtitle}>
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
    credit: {
        width: wp('90%'),
        marginTop: wp('5.5%'),
    },
    subtitle: {
        fontSize: wp('3.9%'),
    },
});

export default MovieScreen;
