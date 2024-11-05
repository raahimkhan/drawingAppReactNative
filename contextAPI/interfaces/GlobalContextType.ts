import { Global } from '@contextAPI/interfaces/Global';

export interface GlobalContextType {
    globalState: Global;
    setGlobalState: React.Dispatch<React.SetStateAction<Global>>;
}