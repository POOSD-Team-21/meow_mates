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

$userid = $body['userid'];
$petSearch = $body['search-pets-input'];

$petSearch = "%$petSearch%";

$connection = new mysqli($host, $user, $dbPassword, $database);

if ($connection->connect_error) {
    error_log('Database connection error: ' . $connection->connect_error);
    send_json(json_encode(['error' => 'Database connection error']));
    exit;
}

$query = "SELECT INTNUM id, FIRST firstName, LAST lastName,
	TYPE type, CARETAKER_FIRST caretakerFirstName,
	CARETAKER_LAST caretakerLastName, EMAIL caretakerEmail,
	PHONE caretakerPhone, CREATED dateCreated FROM PETS
	WHERE USERID = ? AND (FIRST LIKE ? OR LAST LIKE ?)";

$statement = $connection->prepare($query);

if (!$statement) {
    error_log('Prepare statement error: ' . $connection->error);
    send_json(json_encode(['error' => 'Prepare statement error']));
    exit;
}

$statement->bind_param('sss', $userid, $petSearch, $petSearch);

if (!$statement->execute()) {
    error_log('Execute statement error: ' . $statement->error);
    send_json(json_encode(['error' => 'Execute statement error']));
    exit;
}

$result = $statement->get_result();

if ($result->num_rows > 0) {
	$rows = array();
	while ($row = $result->fetch_assoc()) {
		$rows[] = $row;
	}
	send_json(json_encode($rows));
}else{
	echo json_encode(['error' => 'No results found.']);
}

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
?>
