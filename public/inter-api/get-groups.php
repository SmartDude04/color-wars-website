<?php

$team_id = $_GET["id"] ?? exit();
$auth = $_GET["auth"] ?? exit();

require_once "../../api/login/authentication.php";

if (api_auth($auth)) {
    require_once "../../api/points/get-groups.php";
    echo get_groups($team_id);
}