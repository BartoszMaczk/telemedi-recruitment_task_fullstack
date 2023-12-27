<?php

declare(strict_types=1);

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class ExchangeRatesController extends AbstractController
{

    public function index(): JsonResponse
    {
        return new JsonResponse(
            [
                'message' => 'Hello from exchange rates controller!'
            ]
        );
    }

}
