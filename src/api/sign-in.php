<?php
require_once __DIR__ . '/../.env';
$body = get_request_body();

$login = $body['login'];
$password = $body['password'];

$host = $_ENV['DB_HOST'];
$database = $_ENV['DB_DATABASE'];
$user = $_ENV['DB_USERNAME'];
$password = $_ENV['DB_PASSWORD'];

$connection = new mysqli($db_host, $db_user, $db_password, $db_name);

if ($connection->connect_error) {
    send_json(json_encode(array('error' => $connection->connect_error)));
    return;
}

$query = "SELECT * FROM USERS WHERE LOGIN = ?";
$statement = $connection->prepare($query);
$statement->bind_param('s', $body['login']);
$statement->execute();

$result = $statement->get_result();

if ($result->num_rows == 0) {
    send_json(json_encode(array('error' => 'No user found')));
    return;
}

$row = $result->fetch_assoc();
$hashedPassword = $row['PASSWORD'];

if (!password_verify($password, $hashedPassword)) {
    send_json(json_encode(array('error' => 'Incorrect login or password')));
    return;
}

send_json(json_encode(array('id' => $row['INTNUM'])));

$statement->close();
$connection->close();


function get_request_body()
{
    return json_decode(file_get_contents('php://input'), true);
}

function send_json($object)
{
    header('Content-type: application/json');
    echo $object;
}
?>
