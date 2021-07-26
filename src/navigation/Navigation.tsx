import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {RootParamList} from '../../types';
import {Movies, Movie} from '../screens';

const Stack = createStackNavigator<RootParamList>();

function Navigation() {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}} edges={['bottom', 'left', 'right']}>
            <Stack.Navigator initialRouteName="Movies" screenOptions={{headerTitleAlign: 'center'}}>
                <Stack.Screen name="Movies" component={Movies} />
                <Stack.Screen name="Movie" component={Movie} />
            </Stack.Navigator>
        </SafeAreaView>
    );
}

export default Navigation;
