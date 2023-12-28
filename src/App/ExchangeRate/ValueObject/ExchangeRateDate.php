<?php
namespace App\ExchangeRate\ValueObject;

class ExchangeRateDate
{
    private $date;

    public function __construct(string $date)
    {
        $date = \DateTime::createFromFormat('Y-m-d', $date);
        $errors = \DateTime::getLastErrors();

        if ($errors['warning_count'] > 0 || $errors['error_count'] > 0) {
            throw new \InvalidArgumentException('Invalid date format. Expected format is YYYY-MM-DD.');
        }

        $minDate = new \DateTime('2023-01-01');
        $maxDate = new \DateTime();

        if ($date < $minDate || $date > $maxDate) {
            throw new \InvalidArgumentException('Invalid date. Date should be between 2023-01-01 and today.');
        }

        $this->date = $date->format('Y-m-d');
    }

    public function getValue(): string
    {
        return $this->date;
    }
}