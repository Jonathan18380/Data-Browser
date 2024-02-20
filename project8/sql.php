<?php
$servername = "localhost";
$username = "roy147";
$password = "Fantasys310024844!";
$dbname = "mydb";

// Create connection
$conn = new mysqli($servername, $username, $password);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
} 

// Create database
$sql = "CREATE DATABASE myDB";
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully<br>";
} else {
    echo "Error creating database: " . $conn->error ."<br>";
}

$conn->close();
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// sql to create table
$sql = "CREATE TABLE pokemanlist (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
Name VARCHAR(30) NOT NULL,
Color VARCHAR(30) NOT NULL,
Type VARCHAR(30) NOT NULL,
Competitive VARCHAR(30) NOT NULL,
image VARCHAR(30) NOT NULL,
Height VARCHAR(30) NOT NULL
)";

if ($conn->query($sql) === TRUE) {
  echo "Table pokemanlist created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}

$result = file_get_contents('datas.json');
$myArr = json_decode($result);
// prepare and bind
$stmt = $conn->prepare("INSERT INTO pokemanlist (Name, Color, Type, Competitive, image, Height) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $Name, $Color, $Type, $Competitive, $image, $Height);


for($i = 0; $i < sizeof($myArr); $i++){
    $Name = $myArr[$i]->Name;
    $Color = $myArr[$i]->Color;
    $Type = $myArr[$i]->Type;
    $Competitive = $myArr[$i]->Competitive;    
    $image = $myArr[$i]->image;
    $Height = $myArr[$i]->Height;
    $stmt->execute();
}

$stmt->close();
$conn->close();

?>