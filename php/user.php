<?php
ini_set("display_errors", 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
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

  
  if(isset($data['email'])){
    $email = $data['email'];

    $query = "SELECT * FROM estudantes WHERE email='$email'";
    $res = mysqli_query($conn, $query);

    if($res->num_rows){
      http_response_code(409);
      echo json_encode(array(
        'success' => false,
        'error' => "Duplicate entity with email '$email'"
      ));
      exit();
    }

  } else {
    
    http_response_code(400);
    echo json_encode(array(
      'success' => false,
      'error' => "Missing 'email' field"
    ));
    exit();

  }

  if(isset($data['nome'])) $nome = $data['nome'];
  else{
    http_response_code(400);
    echo json_encode(array(
      'success' => false,
      'error' => "Missing 'nome' field"
    ));
    exit();
  }

  if(isset($data['password'])) $password = $data['password'];
  else{
    http_response_code(400);
    echo json_encode(array(
      'success' => false,
      'error' => "Missing 'password' field"
    ));
    exit();
  }

  if ($nome == "Admin") {
    $query = "SELECT * FROM estudantes WHERE nome_estudante='$nome'";
    $res = mysqli_query($conn, $query);
    
    if($res->num_rows){
      http_response_code(409);
      echo json_encode(array(
        'success' => false,
        'error' => "Já existe um Administrador cadastrado!"
      ));
      exit();
    }
  }

  if ($nome == '' || $email == '' || $password == '') {
    http_response_code(400);
    echo json_encode(array(
      'success' => false,
      'error' => "Missing 'nome', 'email' or 'password' field"
    ));
    exit();
  }


  $query = "INSERT INTO estudantes (nome_estudante, email, senha) VALUES ('$nome', '$email', '$password')";

  $res = mysqli_query($conn, $query);

  if ($res) {
    http_response_code(200);
    echo json_encode(array(
      'success' => true,
      'error' => null
    ));
    exit();
  }
}
?>