import {createContext, useContext} from 'react';

import {RegionsApi} from './RegionsApi';

export const ApiContext = createContext<RegionsApi | null>(null);

export const useApi = () => {
    const api = useContext(ApiContext);

    return api;
};
