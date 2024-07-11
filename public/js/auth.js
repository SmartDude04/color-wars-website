window.onload = function(){
    document.getElementById("pw-field").addEventListener("keyup", function() {

    let usernameInput = document.getElementById("un-field").value;
    let passwordInput = document.getElementById('pw-field').value;

    if (usernameInput !== "" && passwordInput !== "") {
        document.getElementById('pw-submit').removeAttribute("disabled");
        document.getElementById('pw-submit').classList.remove("button-disabled");
    } else {
        document.getElementById('pw-submit').setAttribute("disabled", "disabled ");
        document.getElementById('pw-submit').classList.add("button-disabled");
    }
    });

    document.getElementById("un-field").addEventListener("keyup", function() {

    let usernameInput = document.getElementById("un-field").value;
    let passwordInput = document.getElementById('pw-field').value;

    if (usernameInput !== "" && passwordInput !== "") {
        document.getElementById('pw-submit').removeAttribute("disabled");
        document.getElementById('pw-submit').classList.remove("button-disabled");
    } else {
        document.getElementById('pw-submit').setAttribute("disabled", "disabled ");
        document.getElementById('pw-submit').classList.add("button-disabled");
    }
    });
}
