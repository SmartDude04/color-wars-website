<?php

use Random\RandomException;

// Weird that this has to be added, but it does!
if (session_status() == PHP_SESSION_NONE)
{
    session_start();
}

require_once "../api/login/authentication.php";
?>
<!doctype html>
<html lang="en">
<head>
    <title>CGC Color Wars</title>
    <link rel="icon" type="image/x-icon" href="img/favicon.ico">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/fonts.css">
    <link rel="stylesheet" href="css/navbar.css">

    <?php
    if (isset($_GET['page'])) {
        echo "<link rel='stylesheet' href='css/home/" . $_GET['page'] . ".css'>";
    } else {
        echo "<link rel='stylesheet' href='css/home/home.css'>";
    }
    ?>
</head>
<body>
<script src="js/nav.js" defer></script>
<div class="nav-dtp-navbar-container">
    <nav class="nav-dtp-navbar">
        <div class="nav-dtp-navigation">
            <a href="index.php" class="nav-dtp-navbar-link"><img src="img/color-wars-title.png" alt="Color Wars Logo" class="nav-dtp-navbar-logo"></a>
            <div class="nav-dtp-pages">
                <a href="index.php">Home</a>
                <a href="index.php?page=history">History</a>
                <a href="index.php?page=about">About</a>
                <?php
                try {
                    if (confirm_session()) {
                        if ($_SESSION["role"] == 2) {
                            echo "<a href='index.php?page=users'>Users</a>";
                            echo "<a href='index.php?page=teams'>Teams</a>";
                            echo "<a href='index.php?page=groups'>Groups</a>";

                            echo "<div  class='nav-dtp-points-button'><a href='add-points/index.php'>Add Points</a></div>";
                        }
                        if ($_SESSION["role"] == 1) {
                            echo "<div  class='nav-dtp-points-button'><a href='add-points/index.php'>Add Points</a></div>";
                        }
                    }
                } catch (RandomException $e) {
                }
                ?>
            </div>
        </div>

        <?php
        try {
            if (confirm_session()) {
                ?>
                <div class="nav-dtp-user-info">
                    <div class="nav-dtp-name-button">
                        <a href="login/user-info.php" class="nav-dtp-name"><?php echo $_SESSION["name"]; ?></a>
                    </div>
                    <div class="nav-dtp-logout-button">
                        <a href="login/logout.php" class="nav-dtp-logout">Log Out</a>
                    </div>
                </div>
            <?php } else { ?>
                <div class="nav-dtp-login">
                    <div class="nav-dtp-signup-button">
                        <a href="login/signup.php">Sign Up</a>
                    </div>
                    <div class="nav-dtp-login-button">
                        <a href="login/index.php">Log In</a>
                    </div>
                </div>
            <?php }
        } catch (RandomException $e) {
        } ?>

    </nav>
</div>
<nav class="nav-mbl-navbar">
    <a href="index.php" class="nav-mbl-navbar-link"><img src="img/color-wars-main.png" alt="Color Wars Logo" class="nav-mbl-navbar-logo"></a>
    <img src="img/hamburger-icon.png" alt="Menu" class="nav-mbl-hamburger-icon">

    <div class="nav-mbl-hamburger-menu">
        <div class="nav-mbl-hamburger-close">
            <img src="img/hamburger-close.png" alt="Close Menu" class="nav-mbl-hamburger-close-img">
        </div>
        <div class="nav-mbl-page-navigation">
            <a class="nav-mbl-pages" href="index.php">Home</a>
            <a class="nav-mbl-pages" href="index.php?page=history">History</a>
            <a class="nav-mbl-pages" href="index.php?page=about">About</a>
            <?php
            try {
                if (confirm_session()) {
                    if ($_SESSION["role"] == 2) {
                        echo "<a class='nav-mbl-pages' href='index.php?page=users'>Users</a>";
                        echo "<a class='nav-mbl-pages' href='index.php?page=teams'>Teams</a>";
                        echo "<a class='nav-mbl-pages' href='index.php?page=groups'>Groups</a>";

                        echo "<div  class='nav-mbl-points-button'><a href='add-points/index.php' class='nav-mbl-pages'>Add Points</a></div>";
                    }
                    if ($_SESSION["role"] == 1) {
                        echo "<div  class='nav-mbl-points-button'><a href='add-points/index.php' class='nav-mbl-pages'>Add Points</a></div>";
                    }
                }
            } catch (RandomException $e) {
            }
            ?>
        </div>

        <?php
        try {
            if (confirm_session()) {
                ?>
                <div class="nav-mbl-user-info">
                    <a href="login/user-info.php" class="nav-mbl-name"><?php echo $_SESSION["name"]; ?></a>
                    <div class="nav-mbl-logout-button">
                        <a href="login/logout.php" class="nav-mbl-logout">Log Out</a>
                    </div>
                </div>
        <?php } else { ?>
                <div class="nav-mbl-login">
                    <div class="nav-mbl-signup-button">
                        <a href="login/signup.php">Sign Up</a>
                    </div>
                    <div class="nav-mbl-login-button">
                        <a href="login/index.php">Log In</a>
                    </div>
                </div>
        <?php }
        } catch (RandomException $e) {
        } ?>
    </div>
</nav>

<?php
if (isset($_GET['page'])) {
    require_once "home/" . $_GET['page'] . ".php";
} else {
    require_once "home/home.php";
}
?>

</body>
</html>