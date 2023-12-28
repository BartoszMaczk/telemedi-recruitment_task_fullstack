<?php

declare(strict_types=1);

namespace App\Web\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;


class DefaultController extends AbstractController
{

    public function index(): Response
    {
        return $this->render(
            'pages/home.html.twig'
        );
    }
}
