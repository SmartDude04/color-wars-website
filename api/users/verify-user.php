<?php

function verify_user($usr_name): void {
    $conn = db_connect();

    $usr_name = $conn->real_escape_string($usr_name);
    $conn->query("DELETE FROM pending WHERE pnd_usr_name = '$usr_name'");
}
