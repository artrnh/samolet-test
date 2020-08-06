import axios, {AxiosTransformer} from 'axios';
import url from 'url';

import {ApiClientConfig} from 'api/ApiClient';

import {snakeToCamelCase} from './snakeToCamelCase';

export const createAxiosInstance = (config: ApiClientConfig) => {
    const defaultAxiosTransformers = axios.defaults.transformResponse as AxiosTransformer[];

    const proxy = url.format({
        protocol: 'https',
        hostname: 'thingproxy.freeboard.io',
        pathname: '/fetch/'
    });

    const apiHost = url.format({
        protocol: 'https',
        hostname: config.hostname,
        pathname: config.pathname
    });

    return axios.create({
        baseURL: `${proxy}${apiHost}`,
        transformResponse: defaultAxiosTransformers.concat(snakeToCamelCase),
        withCredentials: false
    });
};
