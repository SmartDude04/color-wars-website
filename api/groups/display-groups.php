<?php

require_once "../api/login/authentication.php";

function display_groups(): mysqli_result|bool {
    $conn = db_connect();

    return $conn->query("SELECT tm_name, tm_hex_color, grp_name, grp_id FROM `groups` JOIN teams ON grp_tm_id = tm_id");
}