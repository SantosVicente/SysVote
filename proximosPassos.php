<?php
// implementar JSON Web Tokens (JWT) em PHP:

// bibloteca:
composer require firebase/php-jwt

// exemplo de uso:
use Firebase\JWT\JWT;

$secretKey = 'sua_chave_secreta'; // Substitua pela sua chave secreta
$tokenData = [
    'user_id' => $user_id, // ID do usuário autenticado
    'exp' => time() + 3600 // Tempo de expiração (1 hora)
];

$token = JWT::encode($tokenData, $secretKey, 'HS256');


//validação do token:
$token = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

try {
    $decoded = JWT::decode($token, $secretKey, ['HS256']);
    // O token é válido, e você pode usar $decoded para obter informações do usuário.
} catch (Exception $e) {
    // O token é inválido ou expirou. Trate de acordo.
}

// exemplo de uso:
try {
  $decoded = JWT::decode($token, $secretKey, ['HS256']);

  if ($decoded->exp < time()) {
      // O token expirou, recuse a solicitação.
      http_response_code(401);
      echo "Token expirado. Faça login novamente.";
      exit;
  }

  // O token é válido e ainda não expirou.
  // Prossiga com a lógica de negócios.
} catch (Exception $e) {
  http_response_code(401);
  echo "Token inválido. Faça login novamente.";
  exit;
}

// exemplo de uso junto ao decodeToken() no JS:
use Firebase\JWT\JWT;

$token = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

try {
    $decoded = JWT::decode($token, $secretKey, ['HS256']);
    
    // Verifique a expiração do token, se necessário
    if ($decoded->exp < time()) {
      // O token expirou, recuse a solicitação.
      http_response_code(401);
      echo "Token expirado. Faça login novamente.";
      exit;
    }

    // Obtenha informações do usuário do token (nome, email, etc.)
    $user = [
        'name' => $decoded->name,
        'email' => $decoded->email,
        // Outras informações não sensíveis
    ];

    // Prepare a resposta
    $response = [
        'valid' => true,
        'user' => $user
    ];

    // Envie a resposta em formato JSON
    header('Content-Type: application/json');
    echo json_encode($response);
} catch (Exception $e) {
    // Token é inválido ou expirado
    $response = [
        'valid' => false,
        'status' => 401,
        'message' => 'Unauthorized'
    ];

    // Envie a resposta em formato JSON
    header('Content-Type: application/json');
    echo json_encode($response);
}

?>