window.onload = function() {
    for (const id of user_ids) {
        document.getElementById(id).addEventListener("change", function() {
            let role_id = document.getElementById(id).value;

            // Send the data to change the user role
            fetch(`inter-api/edit-user.php?usr-id=${id}&role-id=${role_id}&auth=${getAuthCookie()}`);
            setTimeout(() => {
                location.reload();
            }, 100);
        });
    }
}

function verifyUser(pnd_usr_name) {
    fetch(`inter-api/verify-user.php?name=${pnd_usr_name}&auth=${getAuthCookie()}`);
    setTimeout(() => {
        location.reload();
    }, 100);
}

function removeUser(pnd_usr_name) {
    fetch(`inter-api/remove-user.php?name=${pnd_usr_name}&auth=${getAuthCookie()}`);
    setTimeout(() => {
        location.reload();
    }, 100);
}

function deleteUser(usr_id) {
    if (confirm("Are you sure you want to delete this user? Deleting the user will also delete any points they have added.")) {
        fetch(`inter-api/delete-user.php?id=${usr_id}&auth=${getAuthCookie()}`);
        setTimeout(() => {
            location.reload();
        }, 100);
    }
}

function getAuthCookie() {
    let cookies = document.cookie.split(";");
    let auth = "";
    for (const cookie of cookies) {
        if (cookie.indexOf("auth=") !== -1) {
            auth = cookie.split("=")[1];
        }
    }
    return auth;
}