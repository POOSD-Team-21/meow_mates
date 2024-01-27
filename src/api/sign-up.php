<?php

loadEnv(__DIR__.'/../.env');

$host = $_ENV['DB_HOST'];
$database = $_ENV['DB_DATABASE'];
$user = $_ENV['DB_USERNAME'];
$dbPassword = $_ENV['DB_PASSWORD'];

$body = get_request_body();

$first = $body['first'];
$last = $body['last'];
$email = $body['email'];
$phone = $body['phone'];
$login = $body['login'];
$password = password_hash($body['password'], PASSWORD_DEFAULT);

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

function loadEnv($filePath)
{
    if (!file_exists($filePath)) {
        throw new Exception('.env file not found');
    }

    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {

        if (empty($line) || strpos($line, '#') === 0) {
            continue;
        }

        list($key, $value) = explode('=', $line, 2);

        $key = trim($key);
        $value = trim($value);

        $_ENV[$key] = $value;
    }
}
?>