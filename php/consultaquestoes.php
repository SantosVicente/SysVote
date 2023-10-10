<?php
ini_set("display_errors", 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// echo '<pre>' . var_export($_GET) . '</pre>';

$hostname = "localhost";
$user = "root";
$password = "ifsp";
$database = "quizif";

$conn = mysqli_connect($hostname, $user, $password, $database);

if (!$conn) {
    die("Conexão falhou: " . mysqli_connect_error());
}

$query = "select * from questoes;";
$results = mysqli_query($conn, $query);
$index = 0;
while ($record = mysqli_fetch_row($results)) {
    $question = array(
        'id' => $record[0],
        'titulo' => $record[1],
        'descricao' => $record[2],
        'disciplina'=> $record[3],
        'dificuldade' => $record[4]
    );
    $questions[$index] = $question;
    $index++;
}

// var_dump($questions);
// $exportedData = var_export($questions, true);
/*
 highlight_string("<?php\n\$data = $exportedData;\n?>");
*/
// foreach ($questions as $key => $value) {
//     // echo "$key: $value <br>";
// }

// Close the connection
mysqli_close($conn);
echo json_encode($questions);

//header("Location: /index.html");
//exit();

?>
