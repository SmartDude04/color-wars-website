<div class="groups-container">

<!--    <div class="group-container" style="background-color: lightblue;">
        <div class="team-and-groups">
            <h1 class="team-name">RED</h1>
            <h1 class="team-groups">Tennis, Pathfinders, Specialty, Arts Camp</h1>
        </div>

        <div class="points-container">
            <h1 class="points">10,504</h1>
        </div>
    </div>-->

    <?php
    require_once "../api/groups/group-arrays.php";
    require_once "../api/groups/colors.php";

    // Get and generate team group containers for each team

    $teams = get_group_arrays();

    foreach ($teams as $team) {

        // Get the string of all groups
        $groups = "";
        foreach ($team['groups'] as $group) {
            $groups .= $group . ", ";
        }
        $groups = substr($groups, 0, -2);

        echo '<div class="group-container">';
        echo '<div class="team-and-groups" style="background-color: ' . make_rgba($team['tm_hex_color'], 0.5) . ';">';
        echo '<h1 class="team-name">' . strtoupper($team['tm_name']) . '</h1>';
        echo '<h1 class="team-groups">' . $groups . '</h1>';
        echo '</div>';
        echo '<div class="points-container">';
        echo '<h1 class="points" id="total-' . $team["tm_name"] . '">' . number_format($team['total']) . '</h1>';
        echo '</div>';
        echo '</div>';
    }


    ?>

</div>