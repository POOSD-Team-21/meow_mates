<?php

$inData = getRequestInfo();

$loginIdentifier = $inData["login"];
$password = $inData["password"];

$conn = new mysqli("localhost", "DBADMIN", "DBADMIN", "DBSHELTER");
if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    $stmt = $conn->prepare("SELECT INTNUM,FIRST,LAST FROM USERS WHERE (LOGIN=? OR EMAIL=? OR PHONE=?) AND PASSWORD=?");
    $stmt->bind_param("ssss", $loginIdentifier, $loginIdentifier, $loginIdentifier, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        returnWithInfo($row['FIRST'], $row['LAST'], $row['INTNUM']);
    } else {
        returnWithError("No Records Found");
    }

    $stmt->close();
    $conn->close();
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
    $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
    sendResultInfoAsJson($retValue);
}

function returnWithInfo($firstName, $lastName, $id)
{
    $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
    sendResultInfoAsJson($retValue);
}

?>
