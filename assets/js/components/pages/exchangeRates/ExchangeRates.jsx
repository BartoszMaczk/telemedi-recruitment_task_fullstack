import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {LoaderContext} from "../../../contexts/LoaderContext";
import './ExchangeRates.css';
import {useExchangeRatesApi} from "../../../apiHooks/useExchangeRatesApi";
import {Spinner} from "../../shared/loaders/spinner/Spinner";

export const ExchangeRates = () => {

    const {date} = useParams();
    const {loading} = useContext(LoaderContext);
    const {getDataList} = useExchangeRatesApi();
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        getDataList(date).then((data) => setDataList(data));
    }, [date]);

    return (
        <div className={'exchangeRatesPage'}>
            {loading ? (
                <Spinner/>
            ) : (
                <section className={'exchangeRatesPage__content'}>
                    <div className={'exchangeRatesPage__content__table'}>
                        <table className={'table table-striped table-hover'}>
                            <thead>
                            <tr>
                                <th scope="col">Waluta</th>
                                {date && <th scope="col">Kurs kupna {date}</th>}
                                {date && <th scope="col">Kurs sprzedaży {date}</th>}
                                <th scope="col">Aktulany kurs kupna</th>
                                <th scope="col">Aktualny kurs sprzedaży</th>
                            </tr>
                            </thead>
                            <tbody>
                            {dataList.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.code + ' - ' + item.currency}</td>
                                    {date && <td>{item.buy}</td>}
                                    {date && <td>{item.sell}</td>}
                                    <td>{item.buy}</td>
                                    <td>{item.sell}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </div>
    )
}
