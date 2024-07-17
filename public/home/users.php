<?php
require_once "../api/users/get-users.php";
?>

<div class="users-container">
    <table class="users-table">
        <tr class="header">
            <th class="top-left">Username</th>
            <th class="top-right">Verify</th>
        </tr>

        <?php

        $pending = get_pending_users();

        foreach ($pending as $user) {
            $name = $user['pnd_usr_name'];
            echo "<tr>";
            echo "<td>$name</td>";
            echo "<td><button onclick='verifyUser(\"$name\")'>Verify</button></td>";
            echo "</tr>";
        }

        ?>
    </table>
</div>

<div class="users-container">
    <table class="users-table">

        <tr class="header">
            <th class="top-left">Username</th>
            <th class="top-right">Role</th>
        </tr>

        <?php

        $users = get_users();

        echo "<script>let user_ids = [];</script>";

        foreach ($users as $user) {
            $usr_id = $user["usr_id"];
            $usr_name = $user["usr_name"];
            $usr_role_id = $user["rl_role"];

            echo "<tr>";
            echo "<td>" . $usr_name . "</td>";
            echo "<td><select id='$usr_id'>";

            for ($i = 1; $i <= 2; $i++) {
                $current_role = $i == 1 ? "User" : "Admin";
                if ($i == $usr_role_id) {
                    echo "<option selected value='$i'>" . $current_role . "</option>";
                } else {
                    echo "<option value='$i'>" . $current_role . "</option>";
                }
            }

            echo "</select></td>";
            echo "</tr>";

            echo "<script>user_ids.push('$usr_id');</script>";
        }
        ?>
    </table>
</div>
<script src="js/users.js" defer></script>