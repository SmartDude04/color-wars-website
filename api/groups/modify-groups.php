<?php

function get_existing_group($id): array {
    $conn = db_connect();

    $result = $conn->query("SELECT * FROM `groups` WHERE grp_id = '$id'");
    $row = $result->fetch_assoc();

    return array(
        "name" => $row['grp_name'],
        "team" => $row["grp_tm_id"]
    );
}

function update_existing_group($id, $name, $team): void {
    $conn = db_connect();

    if (!is_numeric($id)) {
        return;
    }

    // Prevent SQL injection with $name and $team
    $name = $conn->real_escape_string($name);
    $team = $conn->real_escape_string($team);

    $conn->query("UPDATE `groups` SET grp_name = '$name', grp_tm_id = '$team' WHERE grp_id = '$id'");
}

function create_new_group($name, $team): void {
    $conn = db_connect();

    // Prevent SQL injection with $name and $team
    $name = $conn->real_escape_string($name);
    $team = $conn->real_escape_string($team);

    $conn->query("INSERT INTO `groups` (grp_name, grp_tm_id) VALUES ('$name', '$team')");
}

function delete_existing_group($id): void {
    $conn = db_connect();

    if (!is_numeric($id)) {
        return;
    }

    // Delete points entries with the group id
    $conn->query("DELETE FROM `points` WHERE pts_grp_id = '$id'");

    $conn->query("DELETE FROM `groups` WHERE grp_id = '$id'");
}

function get_teams_for_selector(): array {
    $conn = db_connect();

    $result = $conn->query("SELECT tm_id, tm_name FROM teams");

    $return_array = array();
    while ($row = $result->fetch_assoc()) {
        $return_array[] = $row;
    }

    return $return_array;
}