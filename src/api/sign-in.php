<?php

loadEnv(__DIR__.'/../.env');

$host = $_ENV['DB_HOST'];
$database = $_ENV['DB_DATABASE'];
$user = $_ENV['DB_USERNAME'];
$dbPassword = $_ENV['DB_PASSWORD'];

$body = get_request_body();

$login = $body['login'];
$enteredPassword = $body['password'];

function isStrongPassword($password) {
    // Define password complexity rules
    $minLength = 8;
    $hasUppercase = preg_match('/[A-Z]/', $password);
    $hasLowercase = preg_match('/[a-z]/', $password);
    $hasDigit = preg_match('/\d/', $password);
    $hasSpecialChar = preg_match('/[^A-Za-z0-9]/', $password);

    // Check if all rules are met
    if (!(
        strlen($password) >= $minLength &&
        $hasUppercase &&
        $hasLowercase &&
        $hasDigit &&
        $hasSpecialChar)
    ) {
    send_json(json_encode(array('error' => "Password does not meet complexity requirements.")));
    exit;
    } else {
        return false; // Password does not meet complexity requirements
    }
}

$connection = new mysqli($host, $user, $dbPassword, $database);

if ($connection->connect_error) {
    send_json(json_encode(array('error' => $connection->connect_error)));
    exit;
}

$query = "SELECT * FROM USERS WHERE LOGIN = ?";
$statement = $connection->prepare($query);

if (!$statement) {
    send_json(json_encode(array('error' => $connection->error)));
    exit;
}

$statement->bind_param('s', $login);
$statement->execute();

if ($statement->error) {
    send_json(json_encode(array('error' => $statement->error)));
    exit;
}

$result = $statement->get_result();

if ($result->num_rows == 0) {
    send_json(json_encode(array('error' => 'No user found')));
    exit;
}

$row = $result->fetch_assoc();
$hashedPassword = $row['PASSWORD'];

if (!password_verify($enteredPassword, $hashedPassword)) {
    send_json(json_encode(array('error' => 'Incorrect login or password')));
    exit;
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
    exit;
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
