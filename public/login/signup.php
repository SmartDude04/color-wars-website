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

$un_taken = false;

// Attempt to log in the user
if (isset($_POST["submit"]) && isset($_POST["username"]) && isset($_POST["password"])) {
    try {
        $result = new_user($_POST["username"], $_POST["password"], 1);
        if ($result === true) {
            // Sign in approved
            header("Location: new-user.php");
        } else if ($result == "username-taken") {
            $un_taken = true;
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
    <title>Sign Up &bull; GCG Color Wars</title>
    <link rel="icon" type="image/x-icon" href="../img/favicon.ico">
    <link rel="stylesheet" href="../css/login/auth.css">
    <link rel="stylesheet" href="../css/fonts.css">
</head>
<body>
<script src="../js/auth.js" defer></script>
<div class="container">
    <div class="login-panel">
        <h1 class="login-main-text">Sign Up</h1>
        <form method="post" action="" class="login-inputs">
            <h1 id="username-taken" class="pw-warning" style='visibility: <?php echo $un_taken ? "visible" : "hidden"; ?>;'>Username Taken</h1>
            <label>
                <input value="<?php if (isset($_POST["username"])) {echo $_POST["username"];} ?>" type="text" required placeholder="New Username" class="text-field <?php if($un_taken) {echo "incorrect-shake";} ?>" name="username" id="un-field">
            </label>

            <label>
                <input value="<?php if (isset($_POST["password"])) {echo $_POST["password"];} ?>" type="password" required placeholder="New Password" class="text-field" name="password" id="pw-field">
            </label>

            <input type="submit" value="Sign Up" id="pw-submit" disabled="disabled" name="submit" class="login-button button-disabled">
        </form>
    </div>
</div>
</body>
</html>