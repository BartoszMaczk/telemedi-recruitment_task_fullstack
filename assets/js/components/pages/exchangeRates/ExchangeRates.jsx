import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {LoaderContext} from "../../../contexts/LoaderContext";
import './ExchangeRates.css';
import {useExchangeRatesApi} from "../../../apiHooks/useExchangeRatesApi";
import {Spinner} from "../../shared/loaders/spinner/Spinner";
import {TxtBigger} from "../../shared/typography/txtBigger/TxtBigger";

export const ExchangeRates = () => {

    const todayDate = new Date().toISOString().split('T')[0];
    const {date} = useParams();
    const history = useHistory();
    const {loading} = useContext(LoaderContext);
    const {getDataList} = useExchangeRatesApi();
    const [dataList, setDataList] = useState([]);
    const [selectedDate, setSelectedDate] = useState(date || todayDate);

    useEffect(() => {
        let isMounted = true;
        getDataList(selectedDate).then((data) => {
            if (isMounted) setDataList(data);
        });
        return () => {
            isMounted = false
        };
    }, [selectedDate]);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        history.push(`/kursy-walut/${e.target.value}`);
    };

    return (
        <div className={'exchangeRatesPage'}>
            <section className={'exchangeRatesPage__controls'}>
                <TxtBigger className={'exchangeRatesPage__controls__title'}>Tabela kursów kupna i sprzedaży z
                    dnia </TxtBigger>
                <input
                    className={'form-control exchangeRatesPage__controls__datePicker'}
                    type="date"
                    value={selectedDate}
                    min="2023-01-01"
                    max={todayDate}
                    onChange={handleDateChange}
                />
            </section>
            {loading ? (
                <Spinner/>
            ) : (
                <section className={'exchangeRatesPage__content'}>
                    <div className={'exchangeRatesPage__content__table'}>
                        <table className={'table table-dark table-striped table-hover'}>
                            <thead>
                            <tr>
                                <th scope="col">Waluta</th>
                                <th scope="col">Kurs kupna {selectedDate}</th>
                                <th scope="col">Kurs sprzedaży {selectedDate}</th>
                                <th scope="col">Aktulany kurs kupna</th>
                                <th scope="col">Aktualny kurs sprzedaży</th>
                            </tr>
                            </thead>
                            <tbody>
                            {dataList.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.code + ' - ' + item.currency}</td>
                                    <td>{item.buyPrice}</td>
                                    <td>{item.sellPrice}</td>
                                    <td>{item.currentBuyPrice}</td>
                                    <td>{item.currentSellPrice}</td>
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
