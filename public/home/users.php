<?php
require_once "../api/users/get-users.php";

try {
    if (!(confirm_session() && $_SESSION["role"] == 2)) {
        header("location:index.php");
        exit();
    }
} catch (\Random\RandomException $e) {
    header("location:index.php");
    exit();
}

?>

<div class="users-container">
    <table class="users-table">
        <tr class="header">
            <th class="top-left username-col">Username</th>
            <th class="verify-col">Verify</th>
            <th class="top-right remove-col">Remove</th>
        </tr>

        <?php

        $pending = get_pending_users();

        for ($i = 0; $i < count($pending); $i++) {
            $user = $pending[$i];
            $last = $i + 1 == count($pending);
            $name = $user['pnd_usr_name'];
            echo "<tr>";

            if ($last) {
                echo "<td class='bottom-left'>$name</td>";
            } else {
                echo "<td>$name</td>";
            }

            echo "<td><button onclick='verifyUser(\"$name\")'>Verify</button></td>";

            if ($last) {
                echo "<td class='bottom-right'><button onclick='removeUser(\"$name\")'>Remove</button></td>";
            } else {
                echo "<td><button onclick='removeUser(\"$name\")'>Remove</button></td>";
            }
            echo "</tr>";
        }

        ?>
    </table>
</div>

<div class="users-container">
    <table class="users-table">

        <tr class="header">
            <th class="top-left username-col">Username</th>
            <th class="verify-col">Role</th>
            <th class="top-right remove-col">Delete</th>
        </tr>

        <?php

        $users = get_users();

        echo "<script>let user_ids = [];</script>";

        for ($i = 0; $i < count($users); $i++) {
            $user = $users[$i];
            $last = $i + 1 == count($users);
            $usr_id = $user["usr_id"];
            $usr_name = $user["usr_name"];
            $usr_role_id = $user["rl_role"];

            echo "<tr>";

            if ($last) {
                echo "<td class='bottom-left'>" . $usr_name . "</td>";
            } else {
                echo "<td>" . $usr_name . "</td>";
            }

            if ($usr_id == $_SESSION["id"]) {
                echo "<td><select id='$usr_id' disabled>";
            } else {
                echo "<td><select id='$usr_id'>";
            }

            for ($j = 1; $j <= 2; $j++) {
                $current_role = $j == 1 ? "User" : "Admin";
                if ($j == $usr_role_id) {
                    echo "<option selected value='$j'>" . $current_role . "</option>";
                } else {
                    echo "<option value='$j'>" . $current_role . "</option>";
                }
            }

            echo "</select></td>";

            if ($usr_id != $_SESSION["id"]) {
                if ($last) {
                    echo "<td class='bottom-right'><button class='delete' onclick='deleteUser(\"$usr_id\")'>Delete</button></td>";
                } else {
                    echo "<td><button class='delete' onclick='deleteUser(\"$usr_id\")'>Delete</button></td>";
                }
            } else {
                if ($last) {
                    echo "<td class='bottom-right'></td>";
                } else {
                    echo "<td></td>";
                }
            }

            echo "</tr>";

            echo "<script>user_ids.push('$usr_id');</script>";
        }
        ?>
    </table>
</div>
<script src="js/users.js" defer></script>