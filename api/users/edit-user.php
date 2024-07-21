<?php

function edit_user($usr_id, $new_role): void {
    if (!(is_numeric($usr_id) && is_numeric($new_role))) {
        exit();
    }

    $conn = db_connect();

    $conn->query("UPDATE `roles` SET `rl_role`='$new_role' WHERE `rl_usr_id`=$usr_id");
}
