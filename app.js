let signinbtn = document.querySelector("#signinbtn");
let signinModal = document.querySelector("#signinModal");
let signinModalBg = document.querySelector("#signinModalBg");

let signupbtn = document.querySelector("#signupbtn");
let signupModal = document.querySelector("#signup-modal");
let signupModalBg = document.querySelector("#signup-modalbg");

signinbtn.addEventListener("click", () => {
  console.log("test");
  signinModal.classList.add("is-active");
});

signinModalBg.addEventListener("click", () => {
  signinModal.classList.remove("is-active");
});

// functions
function close_modal(modal_id) {
  document.querySelector(`#${modal_id}`).classList.remove("is-active");
}

// Brady work on filters

// Object to store the current filter states
var currentFilters = {
  status: "",
  quarter: "",
  "business function": "", // Key is now in lowercase
  "task category": "", // Key is now in lowercase
  // ... other filters as needed
};

// This function is called every time a filter value is changed.
function filterTable(filterType, value) {
  // Update the current filter state
  currentFilters[filterType.toLowerCase()] = value; // Convert filterType to lowercase

  // Refresh the table to apply all current filters
  refreshFilters();
}

function refreshFilters() {
  // Get the table
  var table = document
    .getElementById("tableContent")
    .getElementsByTagName("table")[0];
  var tr = table.getElementsByTagName("tr");

  // Loop through all rows of the table, except the first one with filters
  for (var i = 1; i < tr.length; i++) {
    var displayRow = true; // Initially assume that the row will be displayed

    // Loop through all filters
    for (var filterType in currentFilters) {
      if (
        currentFilters.hasOwnProperty(filterType) &&
        currentFilters[filterType] !== ""
      ) {
        // Get the index of the column to filter on
        var columnIndex = findColumnIndex(table, filterType);

        // If the column is not found, skip this filterType
        if (columnIndex === -1) continue;

        // Get the text content of the current cell in the column to be filtered
        var td = tr[i].getElementsByTagName("td")[columnIndex];
        if (td) {
          var cellValue = td.textContent.trim() || td.innerText.trim();
          // If the cell's text does not match the filter, don't display the row
          if (
            cellValue.toLowerCase() !== currentFilters[filterType].toLowerCase()
          ) {
            displayRow = false;
            break; // No need to check further filters for this row
          }
        }
      }
    }

    // Apply the display property based on the displayRow flag
    tr[i].style.display = displayRow ? "" : "none";
  }
}

// Find the index of the column by the filterType, which matches the column's header text
function findColumnIndex(table, filterType) {
  var th = table.getElementsByTagName("th");
  for (var headerIndex = 0; headerIndex < th.length; headerIndex++) {
    if (
      th[headerIndex].textContent.trim().toLowerCase() ===
      filterType.toLowerCase()
    ) {
      return headerIndex;
    }
  }
  return -1; // Column not found
}

// Bind the filterTable function to the dropdowns once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("statusFilter").onchange = function () {
    filterTable("status", this.value);
  };
  document.getElementById("quarterFilter").onchange = function () {
    filterTable("quarter", this.value);
  };
  document.getElementById("functionFilter").onchange = function () {
    filterTable("business function", this.value); // Use the correct lowercase filterType
  };
  document.getElementById("categoryFilter").onchange = function () {
    filterTable("task category", this.value); // Use the correct lowercase filterType
  };
});

// Sign Up and In

// Sign Up
signup_form.addEventListener("submit", (e) => {
  // prevent auto refresh
  e.preventDefault();

  // grab email and password
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((credentials) => {
      console.log(
        `UID ${credentials.user.uid} with ${credentials.user.email} has signed up`
      );

      // clear the form
      signup_form.reset();

      // close the modal
      close_modal("signup-modal");
    })
    .catch((err) => {
      // display error message on modal
      const error = document.querySelector(".error");
      error.innerHTML = `<p>${err.message}</p>`;
      // console.log(err.message);
    });
});

// sign out
// signoutbtn.addEventListener("click", () => {
//   auth.signOut().then(() => {
//     console.log("user signed out");
//   });
// });

// Sign Up Modal Link
signupbtn.addEventListener("click", () => {
  signupModal.classList.add("is-active");
});

signupModalBg.addEventListener("click", () => {
  signupModal.classList.remove("is-active");
});

// Sign in and Out
// const allowedEmails = [
//   "joanne.esser@wisc.edu",
//   "nhia.vang@wisc.edu",
//   "megan.armstrong@wisc.edu",
//   "kymberly.aebly@wisc.edu",
//   "susan.laufenberg@wisc.edu",
//   "kathy.mccord@wisc.edu",
//   "dswagner2@wisc.edu",
// ];

// sign in
const signin_form = document.querySelector("#signinForm");
signin_form.addEventListener("submit", (e) => {
  e.preventDefault();
  // grab email and password

  const email = document.querySelector("#email_signin").value;
  const password = document.querySelector("#password_signin").value;

  // authenticate with firebase
  auth.signInWithEmailAndPassword(email, password).then((credentials) => {
    console.log(`${credentials.user.email} is now signed in`);

    signin_form.reset();

    // close the modal
    close_modal("signin-modal");
  });
});

// checking user authentication status
auth.onAuthStateChanged((user) => {
  if (user) {
    // console.log('user is signed in')
    configure_message_bar("The user is now signed in");
    //show user email address at the navigation bar
    document.querySelector("#user-email").innerHTML = user.email;
  } else {
    // console.log('user is now signed out')
    configure_message_bar("The user is now signed out");
    document.querySelector("#user-email").innerHTML = "";
  }
});

// Sign Out
// function signOut() {
//   auth.signOut()
//       .then(() => console.log("Sign out successful"))
//       .catch(error => console.error("Sign out failed", error));
// }
