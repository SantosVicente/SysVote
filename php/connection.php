<?php
ini_set("display_errors", 1);
error_reporting(E_ALL);

$hostname = "localhost";
$user = "root";
$pass = "";
$database = "eleicao";
$conn = mysqli_connect($hostname, $user, $pass, $database);
if (!$conn) {
  die("Conexão falhou: " . mysqli_connect_error());
}
