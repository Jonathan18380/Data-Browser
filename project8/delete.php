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

$deleted = $_GET['nextPrev'];
$deleted++;

$delete_from_db = "DELETE FROM pokemanlist WHERE id = $deleted";

if ($conn->query($delete_from_db) === TRUE) {
    echo "Record deleted and IDs updated successfully";
}
else {
    echo "Error deleting record: " . $conn->error;
}

$conn->close();

?>