<?php

require_once "../api/history/get-points-history.php";


function get_points_history(): array {
    $conn = db_connect();

    $result = $conn->execute_query("SELECT pts_id, tm_name AS 'team', pts_timestamp AS 'date', grp_name AS 'group', usr_name AS 'user', pts_amount AS 'amount'
                                    FROM `points`
                                    JOIN teams ON pts_tm_id = tm_id
                                    JOIN `groups` ON pts_grp_id = grp_id
                                    JOIN users ON pts_usr_id = usr_id
                                    ORDER BY `pts_timestamp` DESC");

    $return_array = array();

    // Make the date for each row into a more readable format
    while ($row = $result->fetch_assoc()) {
        $date_arr = date_parse($row['date']);

        // Make sure the times stay as two digits
        $date_arr["hour"] = intval($date_arr["hour"]) < 10 ? "0" . $date_arr["hour"] : $date_arr["hour"];
        $date_arr["minute"] = intval($date_arr["minute"]) < 10 ? "0" . $date_arr["minute"] : $date_arr["minute"];

        // Add an AM or PM depending on the hour
        $ampm = "AM";
        if (intval($date_arr["hour"]) > 12) {
            $date_arr["hour"] = strval(intval($date_arr["hour"]) - 12);
            $ampm = "PM";
        }

        $new_date = $date_arr["hour"] . ":" . $date_arr["minute"] . " " . $ampm . " on " . $date_arr["month"] . "/" . $date_arr["day"];

        $return_array[] = $row;
        $return_array[array_key_last($return_array)]['date'] = $new_date;
    }

    return $return_array;
}
