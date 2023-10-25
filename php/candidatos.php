<?php
ini_set("display_errors", 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-type: application/json');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$hostname = "localhost";
$user = "root";
$pass = "";
$database = "eleicao";
$conn = mysqli_connect($hostname, $user, $pass, $database);
if (!$conn) {
  die("Conexão falhou: " . mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if(isset($data['nome_candidato'])) $nome_candidato = $data['nome_candidato'];
  else{
    http_response_code(400);
    echo json_encode(array(
      'success' => false,
      'error' => "Missing 'nome_candidato' field"
    ));
    exit();
  }

  if(isset($data['num_candidato'])) $num_candidato = $data['num_candidato'];
  else{
    http_response_code(400);
    echo json_encode(array(
      'success' => false,
      'error' => "Missing 'num_candidato' field"
    ));
    exit();
  }

  $query = "SELECT * FROM candidatos WHERE nome_candidato='$nome_candidato'";
  $res = mysqli_query($conn, $query);
    
  if($res->num_rows){
    http_response_code(409);
    echo json_encode(array(
      'success' => false,
      'error' => "Já existe um Candidato com esse nome cadastrado!"
    ));
    exit();
  }

  $query = "SELECT * FROM candidatos WHERE num_candidato='$num_candidato'";
  $res = mysqli_query($conn, $query);

  if($res->num_rows){
    http_response_code(409);
    echo json_encode(array(
      'success' => false,
      'error' => "Já existe um Candidato com esse número cadastrado!"
    ));
    exit();
  }
  
  if ($nome_candidato == '' || $num_candidato == '') {
    http_response_code(400);
    echo json_encode(array(
      'success' => false,
      'error' => "Missing 'nome', 'email' or 'password' field"
    ));
    exit();
  }

  $query = "INSERT INTO candidatos (nome_candidato, num_candidato) VALUES ('$nome_candidato', '$num_candidato')";
  $res = mysqli_query($conn, $query);

  if ($res) {
    http_response_code(200);
    echo json_encode(array(
      'success' => true,
      'error' => null
    ));
    exit();
  }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $query = "SELECT * FROM candidatos;";
  $res = mysqli_query($conn, $query);

  if ($res) {
    if($res->num_rows){
      http_response_code(200);
      echo json_encode(array(
        'success' => true,
        'login' => true,
        //retorne um array com todos os candidatos
        'data' => $res->fetch_all(MYSQLI_ASSOC),
        'error' => null
      ));
      exit();
    }
  }
}
?>