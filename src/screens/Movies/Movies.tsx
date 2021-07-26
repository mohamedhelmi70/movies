import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '../../components/Themed';

function Movies() {
    return (
        <View style={styles.container}>
            <Text>Movies</Text>
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

export default Movies;
