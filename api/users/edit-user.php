<?php

$usr_id = $_GET["usr-id"];
$new_role = $_GET["role-id"];

require_once "../login/authentication.php";
$conn = db_connect();
$new_role = $conn->real_escape_string($new_role);

$conn->query("UPDATE `roles` SET `rl_role`='$new_role' WHERE `rl_usr_id`=$usr_id");

exit();