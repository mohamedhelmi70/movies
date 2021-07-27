import 'react-native-gesture-handler';
import React from 'react';
import Root from './src/app/Root';
import {StoreProvider} from './src/contexts/StoreContext';

export default function App() {
    return (
        <StoreProvider>
            <Root />
        </StoreProvider>
    );
}
