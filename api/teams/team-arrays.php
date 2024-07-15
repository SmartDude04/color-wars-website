<?php
require_once "../api/login/authentication.php";


function get_team_arrays(): array {
    $conn = db_connect();

    $result = $conn->query("SELECT tm_id, tm_name, SUM(pts_amount) AS `total`, tm_hex_color FROM teams JOIN points ON tm_id = pts_tm_id GROUP BY pts_tm_id ORDER BY total DESC");
    $return_arr = array();

    while ($row = $result->fetch_assoc()) {
        $return_arr[] = $row;

        // Add groups to that array
        $groups_result = $conn->query("SELECT grp_name FROM `groups` WHERE grp_tm_id = '" . $row["tm_id"] . "'");
        $groups_arr = array();

        while ($row_group = $groups_result->fetch_assoc()) {
            $groups_arr[] = ucwords($row_group["grp_name"]);
        }

        $return_arr[array_key_last($return_arr)]["groups"] = $groups_arr;
    }

    
    return $return_arr;
}