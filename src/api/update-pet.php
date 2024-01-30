<?php

loadEnv(__DIR__.'/../.env');

$host = $_ENV['DB_HOST'];
$database = $_ENV['DB_DATABASE'];
$user = $_ENV['DB_USERNAME'];
$dbPassword = $_ENV['DB_PASSWORD'];

$inData = getRequestInfo();

$intnum = $inData['id'];
$type = $inData['type']; // Add fields for all the properties you want to update
$first = $inData['first'];
$last = $inData['last'];
$caretakerId = $inData['caretaker_id'];
$age = $inData['age'];
$descr = $inData['descr'];

$conn = new mysqli($host, $user, $dbPassword, $database);

if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    $query = "UPDATE PETS SET TYPE=?, FIRST=?, LAST=?, AGE=?, DESCR=? WHERE INTNUM = ?";
    $stmt = $conn->prepare($query);
    
    if ($stmt) {
        $stmt->bind_param('sssiiss', $type, $first, $last, $caretakerId, $age, $descr, $intnum);
        $stmt->execute();
        
        $stmt->close();
        $conn->close();
        
        returnWithSuccess();
    } else {
        returnWithError("Update statement preparation error: " . $conn->error);
    }
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj)
{
    header('Content-type: application/json');
    echo json_encode($obj);
}

function returnWithError($err)
{
    $retValue = ['error' => $err];
    sendResultInfoAsJson($retValue);
}

function returnWithSuccess()
{
    $retValue = ['message' => 'Pet updated successfully'];
    sendResultInfoAsJson($retValue);
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
