<?php

function get_teams(): array {
    $conn = db_connect();

    $result = $conn->query("SELECT tm_id, tm_name FROM teams");

    $return_arr = array();
    while ($row = $result->fetch_assoc()) {
        $return_arr[] = $row;
    }

    return $return_arr;
}

function add_points($team_id, $group_id, $amount): void {
    $conn = db_connect();

    // Make sure no bad data is getting into the database
    if (!(is_numeric($amount) && is_numeric($team_id) && is_numeric($group_id))) {
        return;
    }

    $usr_id = $_SESSION['id'];

    $conn->execute_query("INSERT INTO points (pts_timestamp, pts_tm_id, pts_grp_id, pts_usr_id, pts_amount) VALUES (CURRENT_TIMESTAMP(), $team_id, $group_id, $usr_id, $amount)");
}

function update_points($id, $team, $group, $amount): void {
    $conn = db_connect();
    $usr_id = $_SESSION['id'];

    if (!(is_numeric($id) && is_numeric($team) && is_numeric($group) && is_numeric($amount))) {
        return;
    }

    $conn->query("UPDATE points SET pts_tm_id = '$team', pts_grp_id = '$group', pts_timestamp = CURRENT_TIMESTAMP(), pts_usr_id = $usr_id, pts_amount = '$amount' WHERE pts_id = '$id'");
}

function delete_points($id): void {
    $conn = db_connect();

    if (!(is_numeric($id))) {
        return;
    }

    $conn->query("DELETE FROM points WHERE pts_id = '$id'");
}

function get_points_info($id): array {
    $conn = db_connect();

    if (!(is_numeric($id))) {
        return;
    }

    $result = $conn->query("SELECT pts_tm_id, pts_grp_id, pts_amount FROM points WHERE pts_id = '$id'");
    $return_arr = array();
    return $result->fetch_assoc();
}