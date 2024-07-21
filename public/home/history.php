<div class="history-container">
    <table class="history-table">

        <tr class="history-table-header">
            <th class="team-header top-left">Team</th>
            <th class="mobile-disabled date-header">Date/Time</th>
            <th class="mobile-disabled group-header">Group</th>
            <th class="mobile-disabled user-header">User</th>
            <?php

            try {
                if (confirm_session() && $_SESSION["role"] == 2) {
                    echo "<th class='amount-header'>Amount</th>";
                } else {
                    echo "<th class='amount-header top-right'>Amount</th>";
                }
            } catch (\Random\RandomException $e) {
            }
            ?>

            <?php
            // If the user is an admin, display the edit column header
            try {
                if (confirm_session() && $_SESSION["role"] == 2) {
                    echo "<th class='edit-header top-right'></th>";
                }
            } catch (\Random\RandomException $e) {
            }
            ?>

        </tr>
        <?php

        require_once "../api/history/get-points-history.php";

        $rows = get_points_history();

        // Make each table row

        for ($i = 0; $i < count($rows); $i++) {
            $row = $rows[$i];
            $last = $i + 1 == count($rows);
            $desc = $row["description"] != "";
            $darker = $i % 2 != 0;
            $admin = false;
            try {
                $admin = confirm_session() && $_SESSION['role'] == 2;
            } catch (\Random\RandomException $e) {
            }

            if ($darker) {
                echo "<tr class='darker'>";
            } else {
                echo "<tr>";
            }

            if ($last && !$desc) {
                echo "<td class='bottom-left'>" . ucwords($row['team']) . "</td>";
            } else {
                echo "<td>" . ucwords($row['team']) . "</td>";
            }

            echo "<td class='mobile-disabled'>" . $row['date'] . "</td>";
            echo "<td class='mobile-disabled'>" . ucwords($row['group']) . "</td>";
            echo "<td class='mobile-disabled'>" . ucwords($row['user']) . "</td>";

            if ($last && !$admin && !$desc) {
                echo "<td class='bottom-right'>" . number_format($row['amount']) . "</td>";
            } else {
                echo "<td>" . number_format($row['amount']) . "</td>";
            }

            // If the user has high enough perms, show them the edit button
            if ($admin) {
                if ($last && !$desc) {
                    echo "<td class='edit-cell bottom-right'><a href='add-points/index.php?id=" . $row["pts_id"] . "'><img src='img/edit.png' onmouseover='this.src=`img/edit-hover.png`' onmouseout='this.src=`img/edit.png`' alt='Edit'></a></td>";
                } else {
                    echo "<td class='edit-cell'><a href='add-points/index.php?id=" . $row["pts_id"] . "'><img src='img/edit.png' onmouseover='this.src=`img/edit-hover.png`' onmouseout='this.src=`img/edit.png`' alt='Edit'></a></td>";
                }
            }

            echo "</tr>";

            // Add the description row below, if there is one for this entry
            if ($desc) {
                $round = "";
                if ($last) {
                    $round = "bottom-left bottom-right";
                }

                if ($darker) {
                    echo "<tr class='darker'>";
                } else {
                    echo "<tr>";
                }
                echo "<td id='desc' class='description $round' colspan='6'>";
                echo $row['description'];
                echo "</td>";

            }
        }
        ?>
</div>