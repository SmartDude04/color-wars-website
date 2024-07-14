<?php

try {
    if (!(confirm_session() && $_SESSION["role"] == 2)) {
        header("location:index.php");
        exit();
    }
} catch (\Random\RandomException $e) {
}

?>

<div class="add-team-container">
    <div class="add-background">
        <a href="edit-teams/index.php" class="add-team-link">Add Team</a>
    </div>
</div>

<div class="teams-container">

    <!--<div class="team">
        <h1 class="team-name">Blue</h1>
        <a href="edit-teams/index.php" class="edit-link"><img src="img/edit.png" alt="Edit" onmouseover='this.src=`img/edit-hover.png`' onmouseout='this.src=`img/edit.png`' class="edit-img"></a>
    </div>-->

    <?php

    require_once "../api/teams/edit/display-teams.php";
    require_once "../api/teams/colors.php";

    $rows = display_teams();

    while ($row = $rows->fetch_assoc()) {
        echo "<div class='team' style='background-color: " . make_rgba(lighten($row["tm_hex_color"]), 0.7) . ";'>";
        echo "<h1 class='team-name'>" . ucwords($row['tm_name']) . "</h1>";
        echo "<a href='edit-teams/index.php?id=" . $row["tm_id"] . "' class='edit-link'><img src='img/edit.png' alt='Edit' onmouseover='this.src=`img/edit-hover.png`' onmouseout='this.src=`img/edit.png`' class='edit-img'></a>";
        echo "</div>";
    }

    ?>


</div>