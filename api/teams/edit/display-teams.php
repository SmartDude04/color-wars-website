<?php

require_once "../api/login/authentication.php";

function display_teams(): mysqli_result|bool {
    $conn = db_connect();

    return $conn->query("SELECT tm_id, tm_name, tm_hex_color FROM teams");
}