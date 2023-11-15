// sign in modal
let signupbtn = document.querySelector("#signupbtn");
let signupModal = document.querySelector("#signup-modal");
let signupModalBg = document.querySelector("#signup-modalbg");

let signinbtn = document.querySelector("#signinbtn");
let signinModal = document.querySelector("#signinModal");
let signinModalBg = document.querySelector("#signinModalBg");

signinbtn.addEventListener("click", () => {
  signinModal.classList.add("is-active");
});

signinModalBg.addEventListener("click", () => {
  signinModal.classList.remove("is-active");
});

// add row modal

let addrowbtn = document.querySelector("#addrowbtn");
let addrowModal = document.querySelector("#addrowModal");
let addrowModalBg = document.querySelector("#addrowModalBg");

addrowbtn.addEventListener("click", () => {
  console.log("test");
  addrowModal.classList.add("is-active");
});

addrowModalBg.addEventListener("click", () => {
  addrowModal.classList.remove("is-active");
});

// Added a function to sign in the user with their email and password
function signInUser(email, password) {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User is signed in
      console.log("User is signed in!");
      // Get the user's ID
      const uid = userCredential.user.uid;
      // Add the user's data to Firebase Firestore
      db.collection("users").doc(uid).set({
        email: email,
        verified: true,
      });

      // Redirect to tableview.html
      window.location.href = "tableview.html";
    })
    .catch((error) => {
      // Handle error
      console.log(error);
    });
}

// Validate the login form before submitting
function validateForm() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  if (email == "" || password == "") {
    alert("Email and password must be filled out");
    return false;
  }

  // Attempt to sign the user in using Firebase Authentication
  signInUser(email, password);

  return false; // To prevent form submission since we're handling authentication with Firebase
}

{
  // Redirect to tableview.html upon successful validation
  window.location.href = "tableview.html";
  return false; // To prevent form submission since we're using client-side redirection
}

// JavaScript Function to change header color on mouseover
function changeHeaderColor() {
  document.querySelector(".mainheader").style.backgroundColor = "orange";
}

// JavaScript Function to revert header color on mouseout
function revertHeaderColor() {
  document.querySelector(".mainheader").style.backgroundColor = "red";
}

{
  // Redirect to tableview.html upon successful validation
  window.location.href = "tableview.html";
  return false; // To prevent form submission since we're using client-side redirection
}

// JavaScript Function to change header color on mouseover
function changeHeaderColor() {
  document.querySelector(".mainheader").style.backgroundColor = "orange";
}

// JavaScript Function to revert header color on mouseout
function revertHeaderColor() {
  document.querySelector(".mainheader").style.backgroundColor = "red";
}
