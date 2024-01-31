<?php

loadEnv(__DIR__.'/../.env');

$host = $_ENV['DB_HOST'];
$database = $_ENV['DB_DATABASE'];
$user = $_ENV['DB_USERNAME'];
$dbPassword = $_ENV['DB_PASSWORD'];

error_log('Loading environment variables');

$body = get_request_body();

// Log the received data
error_log('Received data: ' . print_r($body, true));

// Check if 'password' and 'login' fields are missing
if (empty($body['password']) || empty($body['login'])) {
    send_json(json_encode(['error' => 'Missing required fields']));
    exit;
}

$login = $body['login'];
$password = password_hash($body['password'], PASSWORD_DEFAULT);
$first = ($body['first'] === NULL || $body['first'] === '') ? '' : $body['first'];
$last = ($body['last'] === NULL || $body['last'] === '') ? '' : $body['last'];
$email = ($body['email'] === NULL || $body['email'] === '') ? NULL : $body['email'];
$phone = ($body['phone'] === NULL || $body['phone'] === '') ? NULL : $body['phone'];


$connection = new mysqli($host, $user, $dbPassword, $database);

if ($connection->connect_error) {
    error_log('Database connection error: ' . $connection->connect_error);
    send_json(json_encode(['error' => 'Database connection error']));
    exit;
}

// Check if the username is already taken
if (is_username_taken($connection, $login)) {
    send_json(json_encode(['error' => 'Username already exists']));
    exit;
}

$query = "INSERT INTO USERS (LOGIN, PASSWORD, FIRST, LAST, EMAIL, PHONE) VALUES (?,?,?,?,?,?)";

$statement = $connection->prepare($query);

if (!$statement) {
    error_log('Prepare statement error: ' . $connection->error);
    send_json(json_encode(['error' => 'Prepare statement error']));
    exit;
}

$statement->bind_param('ssssss', $login, $password, $first, $last, $email, $phone);

if (!$statement->execute()) {
    error_log('Execute statement error: ' . $statement->error);
    send_json(json_encode(['error' => 'Execute statement error']));
    exit;
}

$id = $connection->insert_id;

send_json(json_encode(['id' => $id]));

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
        error_log('.env file not found');
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

    error_log('Finished loading .env file');
}

function is_username_taken($connection, $username)
{
    $query = "SELECT COUNT(*) as count FROM USERS WHERE LOGIN = ?";
    $statement = $connection->prepare($query);
    
    if (!$statement) {
        error_log('Prepare statement error: ' . $connection->error);
        return true; // Assuming an error means username is taken
    }

    $statement->bind_param('s', $username);
    $statement->execute();

    $result = $statement->get_result();
    $row = $result->fetch_assoc();

    $count = $row['count'];

    $statement->close();

    return $count > 0;
}
?>
