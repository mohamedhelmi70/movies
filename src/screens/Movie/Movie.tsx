import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '../../components/Themed';

function Movie() {
    return (
        <View style={styles.container}>
            <Text>Movie</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Movie;
