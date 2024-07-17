window.onload = function() {
    for (const id of user_ids) {
        document.getElementById(id).addEventListener("change", function() {
            let role_id = document.getElementById(id).value;

            // Send the data to change the user role
            fetch(`../api/users/edit-user.php?usr-id=${id}&role-id=${role_id}`);
        });
    }
}

function verifyUser(pnd_usr_name) {
    fetch(`../api/users/verify-user.php?name=${pnd_usr_name}`);
    setTimeout(() => {
        location.reload();
    }, 100);
}