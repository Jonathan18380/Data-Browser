<?php 
$servername = "localhost";
$username = "roy147";
$password = "Fantasys310024844!";
$dbname = "mydb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$count = $_GET['nextPrev'];

$sql = "SELECT * FROM pokemanlist WHERE id = $count";
$result = $conn->query($sql);
$item = $result->fetch_assoc();
echo json_encode($item);
?> 