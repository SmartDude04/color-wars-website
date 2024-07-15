<?php

if (!isset($_GET["id"]) && is_numeric($_GET["id"])) {
    exit();
}

$team_id = $_GET["id"];

// Get the id and the name of each group that works with this team
require_once "../login/authentication.php";
$conn = db_connect();

$result = $conn->query("SELECT grp_id, grp_name FROM `groups` WHERE `grp_tm_id` = $team_id");

// Each group will be separated by a pipe | and each part of the group (id & name) will be separated by a tilde ~
$return_str = "";

while ($row = $result->fetch_assoc()) {
    $grp_id = $row["grp_id"];
    $grp_name = $row["grp_name"];
    $return_str .= "$grp_id~$grp_name|";
}

// Remove the last pipe
$return_str = substr($return_str, 0, -1);

echo $return_str;