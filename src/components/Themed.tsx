import * as React from 'react';
import {Text as DefaultText, View as DefaultView} from 'react-native';

import Colors from '../constants/Colors';
import {isIOS} from '../constants/Facts';
import useColorScheme from '../hooks/useColorSchema';

export function useThemeColor(
    props: {light?: string; dark?: string},
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
    const theme = useColorScheme();
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return Colors[theme][colorName];
    }
}

type ThemeProps = {
    lightColor?: string;
    darkColor?: string;
    font?: 'Roboto' | 'Roboto-Black' | 'Roboto-Light' | 'Roboto-Bold' | 'Roboto-Medium' | 'Roboto-Thin';
    weight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
    const {style, lightColor, darkColor, font, weight, ...otherProps} = props;
    // const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');
    const color = useThemeColor({light: lightColor, dark: lightColor}, 'text'); //disabled dark

    return (
        <DefaultText
            style={[
                {
                    color,
                    textAlign: 'left',
                    fontFamily: isIOS ? 'Roboto' : font || 'Cairo-Regular',
                    fontWeight: isIOS ? weight || '400' : undefined,
                },
                style,
            ]}
            {...otherProps}
        />
    );
}

export function View(props: ViewProps) {
    const {style, lightColor, darkColor, ...otherProps} = props;
    // const backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, 'background');
    const backgroundColor = useThemeColor({light: lightColor, dark: lightColor}, 'background'); //disabled dark
    return <DefaultView style={[{backgroundColor}, style]} {...otherProps} />;
}
