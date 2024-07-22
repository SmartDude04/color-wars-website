<?php

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

<div class="add-group-container">
    <div class="add-background">
        <a href="edit-groups/index.php" class="add-group-link">Add Group</a>
    </div>
</div>

<div class="groups-container">
    <?php

    require_once "../api/groups/display-groups.php";
    require_once "../api/teams/colors.php";

    $rows = display_groups();

    while ($row = $rows->fetch_assoc()) {
        echo "<div class='group'>";
        echo "<div class='group-and-team''>";
        echo "<h1 class='group-name'>" . ucwords($row['grp_name']) . "</h1>";
        echo "<h1 class='team-name' style='color: #" . darken($row["tm_hex_color"]) . ";'>" . ucwords($row['tm_name']) . "</h1>";
        echo "</div>";
        echo "<a href='edit-groups/index.php?id=" . $row["grp_id"] . "' class='edit-link'><img src='img/edit.png' alt='Edit' onmouseover='this.src=`img/edit-hover.png`' onmouseout='this.src=`img/edit.png`' class='edit-img'></a>";
        echo "</div>";
    }

    ?>


</div>