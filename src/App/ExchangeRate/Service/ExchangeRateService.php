<?php

namespace App\ExchangeRate\Service;

use App\ExchangeRate\ValueObject\ExchangeRateDate;
use Symfony\Component\HttpClient\HttpClient;

class ExchangeRateService
{
    private $client;
    private $currencies;

    public function __construct()
    {
        $this->client = HttpClient::create(['base_uri' => 'https://api.nbp.pl/api/exchangerates/tables/a/']);
        $this->currencies = ['EUR', 'USD', 'CZK', 'IDR', 'BRL'];
    }

    public function getCurrencies(): array
    {
        return $this->currencies;
    }

    /**
     * @throws \Throwable
     */
    public function getYesterdayExchangeRate(): array
    {
        $yesterday = new \DateTime('-1 day');
        return $this->getExchangeRates(new ExchangeRateDate($yesterday->format('Y-m-d')));
    }

    /**
     * @throws \Throwable
     */
    public function getExchangeRates(?ExchangeRateDate $date): array
    {
        $requestDate = $date ? $date->getValue() : 'today';
        $response = $this->client->request('GET', $requestDate);
        $statusCode = $response->getStatusCode();
        if ($statusCode === 400) {
            throw new \Exception('Bad Request: The request was improperly formulated or exceeded the data limit.');
        } elseif ($statusCode === 404) {
            if ($requestDate === 'today') {
                return $this->getYesterdayExchangeRate();
            }
            return [];
        }

        $currencies = $this->extractCurrencies($response);
        return $this->addSellAndBuyValues($currencies);
    }

    protected function extractCurrencies($response): array
    {
        return array_values(array_filter($response->toArray()[0]['rates'], function ($item) {
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
            $currency['sell'] = $sell ? round($sell, 4) : null;
            $currency['buy'] = $buy ? round($buy, 4) : null;

            return $currency;
        }, $currencies);
    }
}