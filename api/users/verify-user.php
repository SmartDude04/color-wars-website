<?php

require_once('../login/authentication.php');

$conn = db_connect();

$usr_name = $_GET["name"];
$usr_name = $conn->real_escape_string($usr_name);
$conn->query("DELETE FROM pending WHERE pnd_usr_name = '$usr_name'");

exit();