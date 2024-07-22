<?php

function delete_user($usr_id): void {
    if (!is_numeric($usr_id)) {
        return;
    }

    $conn = db_connect();

    // Remove any points added
    $conn->query("DELETE FROM points WHERE pts_usr_id=$usr_id");

    // Remove the role
    $conn->query("DELETE FROM roles WHERE rl_usr_id=$usr_id");

    // Remove the user themselves
    $conn->query("DELETE FROM users WHERE usr_id=$usr_id");
}