import { createContext } from 'react';
import { GlobalContextType } from '@contextAPI/interfaces/GlobalContextType';
import { GlobalInitialState } from '@contextAPI/initialStates/GlobalInitialState';

export const GlobalContext = createContext<GlobalContextType>({
    globalState: GlobalInitialState,
    setGlobalState: () => {}
});