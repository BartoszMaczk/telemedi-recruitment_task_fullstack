<?php

namespace ExchangeRate\Service;

use App\ExchangeRate\Service\ExchangeRateService;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ExchangeRateServiceTest extends WebTestCase
{
    private $client;
    private $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->client = static::createClient();
        $this->service = static::$container->get(ExchangeRateService::class);
    }

    private function assertCurrencyStructure(array $currency): void
    {
        $this->assertArrayHasKey('currency', $currency);
        $this->assertArrayHasKey('code', $currency);
        $this->assertArrayHasKey('mid', $currency);
        $this->assertArrayHasKey('sell', $currency);
        $this->assertArrayHasKey('buy', $currency);
    }

    public function testGetExchangeRates(): void
    {
        // test e.g. the profile page
        $this->client->request('GET', '/api/exchange-rates');
        $this->assertResponseIsSuccessful();

        $response = $this->client->getResponse();
        $this->assertJson($response->getContent());

        $responseData = json_decode($response->getContent(), TRUE);

        $this->assertIsArray($responseData);
        $this->assertCount(count($this->service->getCurrencies()), $responseData);

        foreach ($responseData as $currency) {
            $this->assertCurrencyStructure($currency);
        }
    }

    public function testGetExchangeRatesWithValidDate(): void
    {
        $this->client->request('GET', '/api/exchange-rates', ['date' => '2023-01-02']);
        $this->assertResponseIsSuccessful();

        $response = $this->client->getResponse();
        $this->assertJson($response->getContent());

        $responseData = json_decode($response->getContent(), TRUE);

        $this->assertIsArray($responseData);
        $this->assertCount(count($this->service->getCurrencies()), $responseData);

        foreach ($responseData as $currency) {
            $this->assertCurrencyStructure($currency);
        }
    }

    public function testGetExchangeRatesWithNoData(): void
    {
        $this->client->request('GET', '/api/exchange-rates', ['date' => '2023-01-01']);
        $this->assertResponseIsSuccessful();

        $response = $this->client->getResponse();
        $this->assertJson($response->getContent());

        $responseData = json_decode($response->getContent(), TRUE);

        $this->assertIsArray($responseData);
        $this->assertCount(0, $responseData);
    }

    public function testGetExchangeRatesWithInvalidDate(): void
    {
        $this->client->request('GET', '/api/exchange-rates', ['date' => 'invalid-date']);
        $this->assertResponseStatusCodeSame(422);

        $response = $this->client->getResponse();
        $this->assertJson($response->getContent());

        $responseData = json_decode($response->getContent(), TRUE);

        $this->assertArrayHasKey('error', $responseData);
        $this->assertEquals('Invalid date format. Expected format is YYYY-MM-DD.', $responseData['error']);
    }

    public function testGetExchangeRatesWithOutOfRangeDate(): void
    {
        $this->client->request('GET', '/api/exchange-rates', ['date' => '2021-01-01']);
        $this->assertResponseStatusCodeSame(422);

        $response = $this->client->getResponse();
        $this->assertJson($response->getContent());

        $responseData = json_decode($response->getContent(), TRUE);

        $this->assertArrayHasKey('error', $responseData);
        $this->assertEquals('Invalid date. Date should be between 2023-01-01 and today.', $responseData['error']);
    }
}