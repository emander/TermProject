function validateForm() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    if (email == "" || password == "") {
        alert("Email and password must be filled out");
        return false;
    }

    // Redirect to tableview.html upon successful validation
    window.location.href = "tableview.html";
    return false;  // To prevent form submission since we're using client-side redirection
}

// JavaScript Function to change header color on mouseover
function changeHeaderColor() {
    document.querySelector('.mainheader').style.backgroundColor = "orange";
}

// JavaScript Function to revert header color on mouseout
function revertHeaderColor() {
    document.querySelector('.mainheader').style.backgroundColor = "red";
}
