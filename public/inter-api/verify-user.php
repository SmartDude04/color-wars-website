<?php

$usr_name = $_GET["name"] ?? exit();
$auth = $_GET["auth"] ?? exit();

require_once "../../api/login/authentication.php";

if (api_auth($auth)) {
    require_once "../../api/users/verify-user.php";
    verify_user($usr_name);
}

