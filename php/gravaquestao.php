<?php
ini_set("display_errors", 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//php starter windows -> C:\xampp\php\php -S localhost:5000

echo '<pre>Inicio da script PHP</pre>';
// echo '<pre>' . var_export($_GET) . '</pre>';

$titulo = $_GET["titulo"];
$descricao = $_GET["descricao"];
$disciplina = $_GET["disciplina"];
$dificuldade = $_GET["dificuldade"];
$opcaoa = $_GET["opcaoa"];
$opcaob = $_GET["opcaob"];
$opcaoc = $_GET["opcaoc"];
$opcaod = $_GET["opcaod"];
$opcaoe = $_GET["opcaoe"];
$opcaocorreta = $_GET["opcaocorreta"];

$hostname = "localhost"; 
$user = "root";
$password = "ifsp";
$database = "quizif";

$conn = mysqli_connect($hostname, $user, $password, $database);

if (!$conn) {
    die("Conexão falhou: " . mysqli_connect_error());
}
echo "Conexão feita com sucesso";

$query = "insert into questoes (titulo, descricao, disciplina, dificuldade, opcaoa, opcaob, opcaoc, opcaod, opcaoe, opcaocorreta) values ('$titulo', '$descricao', '$disciplina', '$dificuldade', '$opcaoa', '$opcaob', '$opcaoc', '$opcaod', '$opcaoe', '$opcaocorreta')";

$res = mysqli_query($conn, $query);
if($res){
    echo '<h2>Questão incluída com sucesso!!!</h2>';
} else {
    echo '<h2>Questão não incluida!!!</h2>';
    var_dump(mysqli_error($conn));
}

// Close the connection
mysqli_close($conn);
header("Location: /index.html");
exit();


?>