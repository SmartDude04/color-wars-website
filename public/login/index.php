<?php
use Random\RandomException;
require "../../api/login/authentication.php";

try {
    if (confirm_session()) {
        // If the user is already logged in, no need to continue; redirect to panel
        header("Location: ../index.php");
        exit();
    }
} catch (RandomException $e) {
    // If something fails, delete the cookie and session data then reload
    session_destroy();
    setcookie("auth", "", time() - 3600, "/");
    header("Location: ../index.php");
    exit();
}

$retry = false;
$pending = false;

// Attempt to log in the user
if (isset($_POST["submit"]) && isset($_POST["username"]) && isset($_POST["password"])) {
    try {
        $result = login($_POST["username"], $_POST["password"]);
        if ($result === true) {
            // Login approved
            header("Location: ../index.php");
        } else if ($result == "pending") {
            $pending = true;
        } else if ($result == "done") {
            $pending = true;
            $retry = true;
        } else {
            // Login denied
            $retry = true;
        }
    } catch (RandomException $e) {
        header("Location: ../index.php");
        exit();
    }
}


?>


<!doctype html>
<html lang="en">
<head>
    <title>Log In &bull; GCG Color Wars</title>
    <link rel="icon" type="image/x-icon" href="../img/favicon.ico">
    <link rel="stylesheet" href="../css/login/auth.css">
    <link rel="stylesheet" href="../css/fonts.css">
</head>
<body>
<script src="../js/auth.js" defer></script>
<div class="container">
    <div class="login-panel">
        <h1 class="login-main-text">Log In</h1>
        <form method="post" action="" class="login-inputs">
            <h1 id="account-pending" class="pw-warning" style='visibility: <?php echo $pending ? "visible" : "hidden"; ?>;'>Account Pending Approval</h1>
            <label>
                <input value="<?php if (isset($_POST["username"])) {echo $_POST["username"];} ?>" type="text" required placeholder="Username" class="text-field" name="username" id="un-field">
            </label>

            <label>
                <input value="<?php if (isset($_POST["password"])) {echo $_POST["password"];} ?>" type="password" required placeholder="Password" class="text-field <?php if($retry || $pending) {echo "incorrect-shake";} ?>" name="password" id="pw-field">
            </label>
            <h1 id="password-length" class="pw-warning" style='visibility: <?php echo $retry ? "visible" : "hidden"; ?>;'>Incorrect Username/Password</h1>

            <input type="submit" value="Log In" id="pw-submit" disabled="disabled" name="submit" class="login-button button-disabled">
        </form>
    </div>
</div>
</body>
</html>