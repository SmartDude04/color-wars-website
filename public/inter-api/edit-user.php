<?php

$usr_id = $_GET["usr-id"] ?? exit();
$new_role = $_GET["role-id"] ?? exit();
$auth = $_GET["auth"] ?? exit();

require_once "../../api/login/authentication.php";

if (api_auth($auth)) {
    require_once "../../api/users/edit-user.php";
    edit_user($usr_id, $new_role);
}