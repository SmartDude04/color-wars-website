<?php

function get_existing_team($id): array {
    $conn = db_connect();

    $result = $conn->query("SELECT * FROM teams WHERE tm_id = '$id'");
    $row = $result->fetch_assoc();

    return array(
        "name" => $row['tm_name'],
        "hex" => $row["tm_hex_color"]
    );
}

function update_existing_team($id, $name, $hex): void {
    $conn = db_connect();

    // Clean $hex so it is just the numeric hex code and no # in front
    $hex = str_replace("#", "", $hex);
    $hex = mb_strtoupper($hex, "UTF-8");

    // Prevent SQL injection with $name and $hex
    $name = $conn->real_escape_string($name);
    $hex = $conn->real_escape_string($hex);

    $conn->query("UPDATE teams SET tm_name = '$name', tm_hex_color = '$hex' WHERE tm_id = '$id'");
}

function create_new_team($name, $hex): void {
    $conn = db_connect();

    // Clean $hex so it is just the numeric hex code and no # in front
    $hex = str_replace("#", "", $hex);
    $hex = mb_strtoupper($hex, "UTF-8");

    // Prevent SQL injection with $name and $hex
    $name = $conn->real_escape_string($name);
    $hex = $conn->real_escape_string($hex);

    $conn->query("INSERT INTO teams (tm_name, tm_hex_color) VALUES ('$name', '$hex')");

    // Add 0 points to the table to have the team show on the homepage
    $result = $conn->query("SELECT tm_id FROM teams WHERE tm_name = '$name'");
    $tm_id = $result->fetch_assoc()["tm_id"];
    $conn->query("INSERT INTO points (pts_timestamp, pts_tm_id, pts_amount) VALUES (CURRENT_TIMESTAMP() , '$tm_id', '0')");
}

function delete_existing_team($id): void {
    $conn = db_connect();

    // Delete all points added to the team
    $conn->query("DELETE FROM points WHERE pts_tm_id = '$id'");

    // Delete all groups assigned to the team
    $conn->query("DELETE FROM `groups` WHERE grp_tm_id = '$id'");

    $conn->query("DELETE FROM teams WHERE tm_id = '$id'");
}