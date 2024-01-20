<?php
$servername = "localhost";
$username = "roy147";
$password = "Fantasys310024844!";
$dbname = "mydb";

// Creates connection to sql server
$conn = new mysqli($servername, $username, $password, $dbname);
// Checks connection from sql server
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM pokemanlist";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $rows = array();
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode($rows);
    $conn->close();
}
?>