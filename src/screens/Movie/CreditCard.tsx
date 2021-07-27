import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Credit} from '../../../types';
import {userDefault} from '../../assets';
import {FastImage} from '../../components';
import {Text, View} from '../../components/Themed';
import {wp} from '../../constants/Layout';

interface CreditCardProps {
    credit: Credit;
}

function CrditCard({credit}: CreditCardProps) {
    return (
        <View style={styles.card}>
            <View>
                {Boolean(credit?.profile_path) ? (
                    <FastImage
                        url={`https://www.themoviedb.org/t/p/original${credit?.profile_path}`}
                        style={styles.profile}
                    />
                ) : (
                    <Image source={userDefault} style={styles.profile} resizeMode="cover" />
                )}
            </View>
            <Text weight="600" font="Roboto-Medium" style={styles.cardTitle}>
                {credit?.name}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        marginRight: wp('7%'),
        borderRadius: wp('2%'),
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    profile: {
        width: wp('20%'),
        height: wp('20%'),
        borderRadius: wp('10%'),
    },
    cardTitle: {
        marginTop: wp('1%'),
        fontSize: wp('3%'),
        maxWidth: wp('27%'),
    },
});

export default CrditCard;
