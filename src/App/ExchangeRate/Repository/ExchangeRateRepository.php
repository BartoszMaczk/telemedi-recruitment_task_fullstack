<?php

namespace App\ExchangeRate\Repository;

use Symfony\Component\HttpClient\HttpClient;

class ExchangeRateRepository
{
    private $client;

    public function __construct()
    {
        $this->client = HttpClient::create(['base_uri' => 'https://api.nbp.pl/api/exchangerates/tables/a/']);
    }

    /**
     * @param string|null $date
     * @return array
     * @throws \Throwable
     */
    public function getExchangeRatesByDate(string $date): array
    {
        $response = $this->client->request('GET', $date);
        $statusCode = $response->getStatusCode();
        if ($statusCode === 400) {
            throw new \Exception('Bad Request: The request was improperly formulated or exceeded the data limit.');
        } elseif ($statusCode === 404) {
            return [];
        }

        return $response->toArray()[0]['rates'];
    }

    /**
     * @throws \Throwable
     */
    public function getTodayCurrencyRates(): array
    {
        return $this->getExchangeRatesByDate('today');
    }

    /**
     * @throws \Throwable
     */
    public function getCurrentExchangeRates(): array
    {
        return $this->getExchangeRatesByDate('');
    }
}