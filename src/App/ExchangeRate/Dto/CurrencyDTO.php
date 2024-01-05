<?php

namespace App\ExchangeRate\Dto;

class CurrencyDTO
{
    public $currency;
    public $code;
    public $mid;
    public $sellPrice;
    public $buyPrice;
    public $currentSellPrice;
    public $currentBuyPrice;

    public function __construct(
        string $currency,
        string $code,
        float  $mid,
        ?float $sellPrice,
        ?float $buyPrice,
        ?float $currentSellPrice,
        ?float $currentBuyPrice
    )
    {
        $this->currency = $currency;
        $this->code = $code;
        $this->mid = $mid;
        $this->sellPrice = $sellPrice;
        $this->buyPrice = $buyPrice;
        $this->currentSellPrice = $currentSellPrice;
        $this->currentBuyPrice = $currentBuyPrice;
    }

    public function getCurrency(): string
    {
        return $this->currency;
    }

    public function setCurrency(string $currency): void
    {
        $this->currency = $currency;
    }

    public function getCode(): string
    {
        return $this->code;
    }

    public function setCode(string $code): void
    {
        $this->code = $code;
    }

    public function getMid(): float
    {
        return $this->mid;
    }

    public function setMid(float $mid): void
    {
        $this->mid = $mid;
    }

    public function getSellPrice(): ?float
    {
        return $this->sellPrice;
    }

    public function setSellPrice(?float $sellPrice): void
    {
        $this->sellPrice = $sellPrice;
    }

    public function getBuyPrice(): ?float
    {
        return $this->buyPrice;
    }

    public function setBuyPrice(?float $buyPrice): void
    {
        $this->buyPrice = $buyPrice;
    }

    public function getCurrentSellPrice(): ?float
    {
        return $this->currentSellPrice;
    }

    public function setCurrentSellPrice(?float $currentSellPrice): void
    {
        $this->currentSellPrice = $currentSellPrice;
    }

    public function getCurrentBuyPrice(): ?float
    {
        return $this->currentBuyPrice;
    }

    public function setCurrentBuyPrice(?float $currentBuyPrice): void
    {
        $this->currentBuyPrice = $currentBuyPrice;
    }
}