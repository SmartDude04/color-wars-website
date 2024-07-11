<?php
require "../../api/login/authentication.php";
session_start();
logout();
header("Location: ../index.php");
exit();