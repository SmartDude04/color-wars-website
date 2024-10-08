<?php

function remove_user($usr_name): void {
    $conn = db_connect();

    $usr_name = $_GET["name"];
    $usr_name = $conn->real_escape_string($usr_name);

    // Make sure the user is still pending so no one can do malicious things
    $pnd_usr_cnt = $conn->query("SELECT pnd_usr_name FROM pending WHERE pnd_usr_name = '$usr_name'");
    if (mysqli_num_rows($pnd_usr_cnt) !== 1) {
        exit();
    }

    // Get the user ID and delete from roles
    $usr_id_result = $conn->query("SELECT usr_id FROM users WHERE usr_name = '$usr_name'");
    $usr_id = mysqli_num_rows($usr_id_result) == 1 ? $usr_id_result->fetch_assoc()["usr_id"] : -1;

    $conn->query("DELETE FROM roles WHERE rl_usr_id = $usr_id");
    $conn->query("DELETE FROM users WHERE usr_name = '$usr_name'");
    $conn->query("DELETE FROM pending WHERE pnd_usr_name = '$usr_name'");
}