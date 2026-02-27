<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->post('/api/chat', 'OpenRouter::chat');
$routes->options('/api/chat', 'OpenRouter::options');
