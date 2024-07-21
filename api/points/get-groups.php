<?php

function get_groups($team_id): ?string {

    if (!is_numeric($team_id)) {
        return null;
    }

    // Get the id and the name of each group that works with this team
    $conn = db_connect();

    $result = $conn->query("SELECT grp_id, grp_name FROM `groups` WHERE `grp_tm_id` = $team_id");

    // Each group will be separated by a pipe | and each part of the group (id & name) will be separated by a tilde ~
    $return_str = "";

    while ($row = $result->fetch_assoc()) {
        $grp_id = $row["grp_id"];
        $grp_name = $row["grp_name"];
        $return_str .= "$grp_id~$grp_name|";
    }

    // Remove the last pipe
    return substr($return_str, 0, -1);
}
