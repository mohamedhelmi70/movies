import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {RootParamList} from '../../types';
import {Movies, Movie} from '../screens';
import {Text, View} from '../components/Themed';
import {wp} from '../constants/Layout';
import Colors from '../constants/Colors';

const Stack = createStackNavigator<RootParamList>();

function Navigation() {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}} edges={['left', 'right']}>
            <Stack.Navigator initialRouteName="Movies" screenOptions={{headerTitleAlign: 'center'}}>
                <Stack.Screen
                    name="Movies"
                    component={Movies}
                    options={{
                        headerStyle: {
                            shadowColor: Colors.light.background,
                        },
                        headerTitle: '',
                        headerRight: () => <View />,
                        headerLeft: () => (
                            <View>
                                <Text
                                    style={{fontSize: wp('6%'), marginHorizontal: wp('5%')}}
                                    weight="700"
                                    font="Roboto-Bold">
                                    Movies
                                </Text>
                            </View>
                        ),
                    }}
                />
                <Stack.Screen
                    name="Movie"
                    component={Movie}
                    options={{
                        headerStyle: {
                            shadowColor: Colors.light.background,
                        },
                        headerTitle: '',
                        headerRight: () => <View />,
                        headerLeft: () => <View />,
                    }}
                />
            </Stack.Navigator>
        </SafeAreaView>
    );
}

export default Navigation;
