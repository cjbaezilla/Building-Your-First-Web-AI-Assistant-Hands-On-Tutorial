<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class Cors implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $response = service('response');
        
        $response->setHeader('Access-Control-Allow-Origin', '*');
        $response->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        $response->setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        if ($request->getMethod() === 'options') {
            return $response->setStatusCode(200);
        }
        
        return null;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        return $response;
    }
}
