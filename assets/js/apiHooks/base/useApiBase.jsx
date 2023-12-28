import axios from "axios";
import {useContext, useMemo} from "react";
import {LoaderContext} from "../../contexts/LoaderContext";

export const useApiBase = () => {

    const {showLoader, hideLoader} = useContext(LoaderContext)
    const responseBody = (response) => response.data

    const apiInstance = {
        get: async (url, config = {}) => {
            showLoader();
            return axios.get(url, config)
                .then(responseBody)
                .catch((error) => {
                    const errorCode = error.response.status;
                    if (errorCode >= 500) {
                        //     TODO:: handle error message
                    }
                    return error;
                })
                .finally(() => {
                    hideLoader();
                })
        },
    }

    const api = useMemo(() => {
        axios.defaults.baseURL = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ":" + window.location.port : ""}/api`;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        return {apiInstance}
    }, [apiInstance])

    return {api}
};