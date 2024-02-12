<?php
loadEnv(__DIR__.'/../.env');

$host = $_ENV['DB_HOST'];
$database = $_ENV['DB_DATABASE'];
$user = $_ENV['DB_USERNAME'];
$dbPassword = $_ENV['DB_PASSWORD'];

$inData = getRequestInfo();
error_log(json_encode($inData)); // Log the input data

$intnum = $inData['id'] ?? '';
$type = $inData['petType'] ?? ''; 
$first = $inData['petFirst'] ?? ''; 
$last = $inData['petLast'] ?? ''; 
$caretakerFirstName = $inData['caretakerFirst'] ?? ''; 
$caretakerLastName = $inData['caretakerLast'] ?? ''; 
$caretakerEmail = $inData['caretakerEmail'] ?? '';
$caretakerPhone = $inData['caretakerPhone'] ?? ''; 

// Check if required fields are provided
if (empty($intnum) || empty($type) || empty($first) || empty($last) || empty($caretakerFirstName) || empty($caretakerLastName) || empty($caretakerEmail) || empty($caretakerPhone)) {
    returnWithError('Missing required fields.');
    exit();
}

$conn = new mysqli($host, $user, $dbPassword, $database);

if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    $query = "UPDATE PETS SET TYPE=?, FIRST=?, LAST=?, CARETAKER_FIRST=?, CARETAKER_LAST=?, EMAIL=?, PHONE=? WHERE INTNUM = ?";
    $stmt = $conn->prepare($query);
    
    if ($stmt) {
        // Adjusted binding types
        $stmt->bind_param('ssssssii', $type, $first, $last, $caretakerFirstName, $caretakerLastName, $caretakerEmail, $caretakerPhone, $intnum);
        
        if ($stmt->execute()) {
            returnWithSuccess();
        } else {
            returnWithError("Error executing update statement: " . $stmt->error);
        }
        
        $stmt->close();
    } else {
        returnWithError("Update statement preparation error: " . $conn->error);
    }
    
    $conn->close();
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
