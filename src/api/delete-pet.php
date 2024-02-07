<?php

loadEnv(__DIR__.'/../.env');

$host = $_ENV['DB_HOST'];
$database = $_ENV['DB_DATABASE'];
$user = $_ENV['DB_USERNAME'];
$dbPassword = $_ENV['DB_PASSWORD'];

$inData = getRequestInfo();

$intnum = $inData['id'];

$conn = new mysqli($host, $user, $dbPassword, $database);

if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    // Log received data
    error_log('Received data: ' . print_r($inData, true));
    
    $query = "DELETE FROM PETS WHERE INTNUM = ?";
    $stmt = $conn->prepare($query);
    
    if ($stmt) {
        // Log SQL query
        error_log('SQL Query: ' . $query);
        
        $stmt->bind_param('i', $intnum);
        $stmt->execute();
        
        if ($stmt->affected_rows > 0) {
            $deletedPetId = $intnum; // Since we know the ID of the deleted pet
            $stmt->close();
            $conn->close();
            returnWithSuccess($deletedPetId);
        } else {
            // No rows affected, possibly the pet with the given ID doesn't exist
            returnWithError("No pet found with ID: " . $intnum);
        }
    } else {
        returnWithError("Delete statement preparation error: " . $conn->error);
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
    // Log the error
    error_log('Error: ' . $err);
    
    $retValue = ['error' => $err];
    sendResultInfoAsJson($retValue);
}

function returnWithSuccess($deletedPetId)
{
    // Log success message
    error_log('Pet deleted successfully. ID: ' . $deletedPetId);
    
    $retValue = ['message' => 'Pet deleted successfully', 'deleted_pet_id' => $deletedPetId];
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

