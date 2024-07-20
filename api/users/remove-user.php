<?php

require_once('../login/authentication.php');

$conn = db_connect();

$usr_name = $_GET["name"];
$usr_name = $conn->real_escape_string($usr_name);

// Make sure the user is still pending so no one can do malicious things
$pnd_usr_cnt = $conn->query("SELECT pnd_usr_name FROM pending WHERE pnd_usr_name = '$usr_name'");
if (mysqli_num_rows($pnd_usr_cnt) !== 1) {
    exit();
}

// Get the user ID
$usr_id = $conn->query("SELECT usr_id FROM users WHERE usr_name = '$usr_name'")->fetch_assoc()["usr_id"];
// Remove the user's role
$conn->query("DELETE FROM roles WHERE rl_usr_id = $usr_id");

$conn->query("DELETE FROM users WHERE usr_name = '$usr_name'");
$conn->query("DELETE FROM pending WHERE pnd_usr_name = '$usr_name'");

exit();