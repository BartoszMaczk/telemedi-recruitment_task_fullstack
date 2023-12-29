import axios from "axios";
import {useContext, useMemo} from "react";
import {ErrorModalContext} from "../../contexts/ErrorModalContext";
import {LoaderContext} from "../../contexts/LoaderContext";
import {getPolishErrorMessage} from "../../utils/errorMessages";

export const useApiBase = () => {

    const {showError} = useContext(ErrorModalContext);
    const {showLoader, hideLoader} = useContext(LoaderContext);
    const responseBody = (response) => response.data

    const apiInstance = {
        get: async (url, config = {}) => {
            showLoader();
            return axios.get(url, config)
                .then(responseBody)
                .catch((error) => {
                    if (error.response && error.response.data && error.response.data.error) {
                        showError(getPolishErrorMessage(error.response.data.error));
                    } else {
                        showError(getPolishErrorMessage(error.message));
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