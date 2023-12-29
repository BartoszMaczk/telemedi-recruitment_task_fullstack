<?php

namespace App\ExchangeRate\Service;

use App\ExchangeRate\Dto\CurrencyDTO;
use App\ExchangeRate\Repository\ExchangeRateRepository;
use App\ExchangeRate\ValueObject\ExchangeRateDate;

class ExchangeRateService
{
    private $repository;
    private $currencies;

    public function __construct(ExchangeRateRepository $repository)
    {
        $this->repository = $repository;
        $this->currencies = ['EUR', 'USD', 'CZK', 'IDR', 'BRL'];
    }

    public function getCurrencies(): array
    {
        return $this->currencies;
    }

    /**
     * @throws \Throwable
     */
    public function getExchangeRates(?ExchangeRateDate $date): array
    {
        $currentExchangeRates = $this->repository->getCurrentExchangeRates();
        $dateExchangeRates = $date ? $this->repository->getExchangeRatesByDate($date->getValue()) : $this->repository->getTodayCurrencyRates();

        $currentExchangeRates = $this->filterCurrencies($currentExchangeRates);
        $currentExchangeRates = $this->addSellAndBuyValues($currentExchangeRates);

        $dateExchangeRates = $this->filterCurrencies($dateExchangeRates);
        $dateExchangeRates = $this->addSellAndBuyValues($dateExchangeRates);

        return $this->prepareCurrenciesDTOs($currentExchangeRates, $dateExchangeRates);
    }

    protected function filterCurrencies($response): array
    {
        return array_values(array_filter($response, function ($item) {
            return in_array($item['code'], $this->currencies, true);
        }));
    }

    protected function addSellAndBuyValues(array $currencies): array
    {
        return array_map(function ($currency) {
            if (in_array($currency['code'], ['EUR', 'USD'], true)) {
                $sell = $currency['mid'] + 0.07;
                $buy = $currency['mid'] + 0.05;
            } else {
                $sell = $currency['mid'] + 0.15;
                $buy = null;
            }

            $sell = $sell ? round($sell, 4) : null;
            $buy = $buy ? round($buy, 4) : null;

            $currency['sellPrice'] = $sell;
            $currency['buyPrice'] = $buy;

            return $currency;
        }, $currencies);
    }

    protected function prepareCurrenciesDTOs(array $currentExchangeRates, array $dateExchangeRates): array
    {
        return array_map(function ($code, $currentExchangeRate) use ($dateExchangeRates) {
            $dateExchangeRate = $dateExchangeRates[$code] ?? null;

            return new CurrencyDTO(
                $currentExchangeRate['currency'],
                $currentExchangeRate['code'],
                $currentExchangeRate['mid'],
                $dateExchangeRate ? $dateExchangeRate['sellPrice'] : null,
                $dateExchangeRate ? $dateExchangeRate['buyPrice'] : null,
                $currentExchangeRate['sellPrice'] ?? null,
                $currentExchangeRate['buyPrice'] ?? null
            );
        }, array_keys($currentExchangeRates), $currentExchangeRates);
    }
}