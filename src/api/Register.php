<?php

$inData = getRequestInfo();

$firstName = $inData["firstName"];
$lastName = $inData["lastName"];
$login = $inData["login"];
$password = $inData["password"];
$email = isset($inData["email"]) ? $inData["email"] : null;
$phone = isset($inData["phone"]) ? $inData["phone"] : null;

$conn = new mysqli("localhost", "DBADMIN", "DBADMIN", "DBSHELTER");
if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    $sql = "SELECT * FROM USERS WHERE LOGIN=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $login);
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = mysqli_num_rows($result);

    if ($rows == 0) {
        $stmt = $conn->prepare("INSERT into USERS (FIRST, LAST, LOGIN, PASSWORD, EMAIL, PHONE) VALUES(?,?,?,?,?,?)");
        $stmt->bind_param("sssssi", $firstName, $lastName, $login, $password, $email, $phone);
        $stmt->execute();
        $id = $conn->insert_id;
        $stmt->close();
        $conn->close();
        http_response_code(200);
        $searchResults .= '{"id": ' . $id . '}';
        returnWithInfo($searchResults);
    } else {
        http_response_code(409);
        returnWithError("Username taken");
    }
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj)
{
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError($err)
{
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson($retValue);
}

function returnWithInfo($searchResults)
{
    $retValue = '{"results":[' . $searchResults . '],"error":""}';
    sendResultInfoAsJson($retValue);
}