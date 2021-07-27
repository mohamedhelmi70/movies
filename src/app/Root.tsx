import React from 'react';
import Navigation from '../navigation/Navigation';
import useColorScheme from '../hooks/useColorSchema';
import {NavigationContainer, DarkTheme, DefaultTheme} from '@react-navigation/native';
import {useStore} from '../contexts/StoreContext';
import useIsMountedRef from '../hooks/useIsMountedRef';
import axios from 'axios';

export default function AppRoot() {
    const isMountedRef = useIsMountedRef();
    const colorScheme = useColorScheme();
    const {addGenres} = useStore();

    const getGenres = React.useCallback(async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/genre/movie/list?api_key=4f298a53e552283bee957836a529baec&language=en-US`,
            );
            if (isMountedRef?.current) {
                addGenres(response?.data?.genres);
            }
        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);

    React.useEffect(() => {
        getGenres();
    }, [getGenres]);

    return (
        <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Navigation />
        </NavigationContainer>
    );
}
