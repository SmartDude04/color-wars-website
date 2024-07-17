<?php

function get_users() {
    $conn = db_connect();

    // Verify the user is allowed to be here
    try {
        if (!(confirm_session() && $_SESSION["role"]) == 2) {
            exit();
        }
    } catch (\Random\RandomException $e) {
        exit();
    }

    $result = $conn->query("SELECT usr_id, usr_name, rl_role FROM `users` JOIN roles ON rl_usr_id = usr_id");

    $return_arr = array();
    while ($row = $result->fetch_assoc()) {
        $return_arr[] = $row;
    }

    return $return_arr;
}

function get_pending_users() {
    $conn = db_connect();

    // Verify the user is allowed to be here
    try {
        if (!(confirm_session() && $_SESSION["role"]) == 2) {
            exit();
        }
    } catch (\Random\RandomException $e) {
        exit();
    }

    $result = $conn->query("SELECT pnd_usr_name FROM `pending`");

    $return_arr = array();
    while ($row = $result->fetch_assoc()) {
        $return_arr[] = $row;
    }

    return $return_arr;
}