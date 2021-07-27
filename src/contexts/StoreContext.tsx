import * as React from 'react';
import {Genre} from '../../types';

interface StoreState {
    genres: Genre[];
}

type StoreAction = {type: 'ADD_GENRES'; genres: Genre[]};

interface StoreContextActions {
    addGenres: (genres: Genre[]) => void;
}

interface StoreContextType extends StoreState, StoreContextActions {}

const StoreContext = React.createContext<StoreContextType>({
    genres: [],
    addGenres: () => {},
});

export const StoreProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = React.useReducer(StoreReducer, {genres: []});

    const StoreActions: StoreContextActions = React.useMemo(
        () => ({
            addGenres: (genres: Genre[]) => {
                dispatch({type: 'ADD_GENRES', genres});
            },
        }),
        [],
    );

    return <StoreContext.Provider value={{...state, ...StoreActions}}>{children}</StoreContext.Provider>;
};

const StoreReducer = (prevState: StoreState, action: StoreAction): StoreState => {
    switch (action.type) {
        case 'ADD_GENRES':
            return {
                ...prevState,
                genres: action?.genres,
            };
    }
};

export const useStore = (): StoreContextType => {
    const context = React.useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be inside an App with a value');
    }
    return {...context};
};
