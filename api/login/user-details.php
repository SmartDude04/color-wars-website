<?php

use Random\RandomException;
require_once "authentication.php";

/**
 * @throws RandomException
 */
function get_user_role() {
    if (confirm_session()) {
        return $_SESSION['role'];
    } else {
        return null;
    }
}