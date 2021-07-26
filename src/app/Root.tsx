import React from 'react';
import Navigation from '../navigation/Navigation';
import useColorScheme from '../hooks/useColorSchema';
import {NavigationContainer, DarkTheme, DefaultTheme} from '@react-navigation/native';

export default function AppRoot() {
    const colorScheme = useColorScheme();
    return (
        <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Navigation />
        </NavigationContainer>
    );
}
