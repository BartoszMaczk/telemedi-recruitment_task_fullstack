<?php

declare(strict_types=1);

namespace App\ExchangeRate\Controller\Api;

use App\ExchangeRate\Service\ExchangeRateService;
use App\ExchangeRate\ValueObject\ExchangeRateDate;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ExchangeRatesController extends AbstractController
{

    /**
     * @throws \Exception
     */
    public function index(Request $request, ExchangeRateService $service, LoggerInterface $logger): JsonResponse
    {
        try {
            $requestDate = $request->get('date');
            $date = $requestDate ? new ExchangeRateDate($request->get('date')) : null;
            $exchangeRates = $service->getExchangeRates($date);

            return new JsonResponse($exchangeRates);
        } catch (\Throwable $e) {
            $logger->error($e->getMessage());
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }

}
