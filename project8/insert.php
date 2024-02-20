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

// grabs from script3.js and binds the information to $pokeman (decodes)
$pokeman_insert = $_GET['insertPokeman'];
$pokeman = json_decode($pokeman_insert);


$sql = "INSERT INTO pokemanlist (Name, Color, Type, competitive, image, Height) VALUES ('$pokeman->Name', '$pokeman->Color', '$pokeman->Type', '$pokeman->Competitive', '$pokeman->image', '$pokeman->Height')";
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the database connection
$conn->close();
?> 