import {useApiBase} from "./base/useApiBase";
import {AxiosError} from "axios";

export const useExchangeRatesApi = () => {
    const {api} = useApiBase();

    const getDataList = async (date) => {
        const param = date ? `?date=${date}` : '';
        const res = await api.apiInstance.get(`/exchange-rates${param}`);
        if (!(res instanceof AxiosError)) {
            return res;
        }
        return [];
    };

    return {
        getDataList
    };
}