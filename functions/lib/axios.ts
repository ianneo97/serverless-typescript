import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

axios.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        if (config.headers === undefined) {
            config.headers = {};
        }

        config.baseURL = process.env.VUE_APP_ENDPOINT_URL;
        config.headers['Accept'] = '*/*';
        config.headers['Content-Type'] = 'application/json';

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default axios;
