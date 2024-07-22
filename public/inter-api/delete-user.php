<?php

$usr_id = $_GET["id"] ?? exit();
$auth = $_GET["auth"] ?? exit();

require_once "../../api/login/authentication.php";

if (api_auth($auth)) {
    require_once "../../api/users/delete-user.php";
    delete_user($usr_id);
}