<?php
include_once("connection.php");

ini_set("display_errors", 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-type: application/json');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if(isset($data['email'])){
    $email = $data['email'];

    $query = "SELECT * FROM estudantes WHERE email='$email'";
    $res = mysqli_query($conn, $query);

    if(!$res->num_rows){
      http_response_code(409);
      echo json_encode(array(
        'success' => false,
        'error' => "Not found entity with email '$email'"
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

  if ($email == "") {
    http_response_code(400);
    echo json_encode(array(
      'success' => false,
      'error' => "Missing 'num_candidato' or 'email' field"
    ));
    exit();
  }

  $query = "SELECT * FROM votos WHERE email='$email'";
  $res = mysqli_query($conn, $query);

  if($res->num_rows){
    http_response_code(409);
    echo json_encode(array(
      'success' => false,
      'error' => "Duplicate entity with email '$email'"
    ));
    exit();
  } else {
    http_response_code(200);
    echo json_encode(array(
      'success' => true,
      'error' => null
    ));
    exit();
  }
}
?>