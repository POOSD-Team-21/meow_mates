<?php
$body = get_request_body();

$first = $body['first'];
$last = $body['last'];
$email = $body['email'];
$phone = $body['phone'];
$login = $body['login'];
$password = password_hash($body['password'], PASSWORD_DEFAULT);

	$host = $_ENV['DB_HOST'];
	$database = $_ENV['DB_DATABASE'];
	$user = $_ENV['DB_USERNAME'];
	$password = $_ENV['DB_PASSWORD'];

$connection = new mysqli($db_host, $db_user, $db_password, $db_name);

if ($connection->connect_error) {
    send_json(json_encode(array('error' => $connection->connect_error)));
}

$query = "INSERT INTO USERS (FIRST,LAST,EMAIL,PHONE,LOGIN,PASSWORD) VALUES (?,?,?,?,?,?)";

$statement = $connection->prepare($query);
$statement->bind_param('ssssss', $first, $last, $email, $phone, $login, $password);
$statement->execute();

$id = $connection->insert_id;

send_json(json_encode(array('id' => $id)));

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
