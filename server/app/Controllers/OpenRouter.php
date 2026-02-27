<?php

namespace App\Controllers;

use GuzzleHttp\Client;

class OpenRouter extends BaseController
{
    public function options(): \CodeIgniter\HTTP\Response
    {
        return $this->response
            ->setHeader('Access-Control-Allow-Origin', '*')
            ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            ->setHeader('Access-Control-Allow-Headers', 'Content-Type')
            ->setStatusCode(200);
    }

    public function chat(): \CodeIgniter\HTTP\Response
    {
        $this->response->setHeader('Access-Control-Allow-Origin', '*');
        $this->response->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        $this->response->setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if ($this->request->getMethod() === 'options') {
            return $this->response->setStatusCode(200);
        }

        $apiKey = getenv('OPENROUTER_API_KEY');
        
        if (empty($apiKey)) {
            return $this->response->setJSON(['error' => 'API key not configured'])->setStatusCode(500);
        }

        $prompt = $this->request->getVar('prompt') ?? 'Hello';

        $payload = [
            'model' => 'nvidia/nemotron-3-nano-30b-a3b:free',
            'input' => [
                ['role' => 'user', 'content' => $prompt]
            ]
        ];

        $client = new Client();

        try {
            $response = $client->post('https://openrouter.ai/api/v1/responses', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $apiKey,
                    'Content-Type' => 'application/json',
                    'HTTP-Referer' => "https://baeza.ai",
                    'X-Title' => 'Baeza AI',
                ],
                'json' => $payload,
                'timeout' => 120,
                'verify' => false,
            ]);

            $body = json_decode($response->getBody()->getContents(), true);

            return $this->response->setJSON($body);
        } catch (\Exception $e) {
            return $this->response->setJSON(['error' => $e->getMessage()])->setStatusCode(500);
        }
    }
}
