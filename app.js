// functions

function del_doc(id){
  db.collection("tableview").doc(id).delete().then(() => alert("row deleted"));
};

function update_doc(ele, id){
  console.log(ele);
  let inputs = ele.parentNode.parentNode.querySelectorAll("input");

  inputs[0].type = "number";
  inputs[1].type = "text";
  inputs[2].type = "text";
  inputs[3].type = "text";
  inputs[4].type = "date";
  inputs[5].type = "date";
  inputs[6].type = "text";
  inputs[7].type = "text";

  db.collection("tableview").doc(id).update({
      quarter: inputs[0].value,
      bisfunction: inputs[1].value,
      taskcat: inputs[2].value,
      task: inputs[3].value,
      startdate: inputs[4].value,
      enddate: inputs[5].value,
      collaborators: inputs[6].value,
      comments: inputs[7].value,
  });
};

// sign in modal

let signinbtn = document.querySelector("#signinbtn");
let signinModal = document.querySelector("#signinModal");
let signinModalBg = document.querySelector("#signinModalBg");
const signup_form = document.querySelector("#signup_form");

signinbtn.addEventListener("click", () => {
  signinModal.classList.add("is-active");
});

signinModalBg.addEventListener("click", () => {
  signinModal.classList.remove("is-active");
});

// add row modal

let addrowbtn = document.querySelector('#addrowbtn');
let addrowModal = document.querySelector('#addrowModal');
let addrowModalBg = document.querySelector('#addrowModalBg');

addrowbtn.addEventListener('click', () =>{
  addrowModal.classList.add('is-active');
});

addrowModalBg.addEventListener('click', () => {
  addrowModal.classList.remove('is-active');
});

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

// sign in
const signin_form = document.querySelector("#signinForm");
signin_form.addEventListener("submit_signin", (e) => {
  e.preventDefault();
  // grab email and password

  const email = document.querySelector("#email_siginin").value;
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
// auth.onAuthStateChanged((user) => {
//   if (user) {
//     // console.log('user is signed in')
//     alert("The user is now signed in");
//     //show user email address at the navigation bar
//     document.querySelector("#email_signin").innerHTML = user.email;
//   } else {
//     // console.log('user is now signed out')
//     // alert("The user is now signed out");
//     document.querySelector("#email_signin").innerHTML = "";
//   }
// });

// Restricting Access

// // Define a list of allowed users
// const allowedUsers = [
//   { email: "joanne.esser@wisc.edu", password: "password1" },
//   { email: "nhia.vang@wisc.edu", password: "password2" },
//   { email: "megan.armstrong@wisc.edu", password: "password3" },
//   { email: "kymberly.aebly@wisc.edu", password: "password4" },
//   { email: "susan.laufenberg@wisc.edu", password: "password5" },
//   { email: "kathy.mccord@wisc.edu", password: "password6" },
//   { email: "dswagner2@wisc.edu", password: "password7" },
// ];

// // Function to authenticate a user
// async function authenticateUser(email, password) {
//   const allowedUser = allowedUsers.find(
//     (user) => user.email === email && user.password === password
//   );

//   if (allowedUser) {
//     try {
//       // Sign in the user using Firebase Authentication
//       const userCredential = await firebase
//         .auth()
//         .signInWithEmailAndPassword(email, password);
//       const user = userCredential.user;
//       console.log("Successfully authenticated user:", user.email);
//       return user;
//     } catch (error) {
//       console.error("Error authenticating user:", error.message);
//       return null;
//     }
//   } else {
//     console.error("User not allowed to log in.");
//     return null;
//   }
// }

// // Example usage
// const emailToAuthenticate = document.querySelector("#email").value;
// const passwordToAuthenticate = document.querySelector("#password").value;

// authenticateUser(emailToAuthenticate, passwordToAuthenticate);

// Sign in and Out
const allowedEmails = [
  "joanne.esser@wisc.edu",
  "nhia.vang@wisc.edu",
  "megan.armstrong@wisc.edu",
  "kymberly.aebly@wisc.edu",
  "susan.laufenberg@wisc.edu",
  "kathy.mccord@wisc.edu",
  "dswagner2@wisc.edu",
];

function signIn() {
  const emailInput = document.getElementById("email_signin").value;

  // Check if the entered email is in the list of allowed emails
  if (allowedEmails.includes(emailInput)) {
    alert("Sign in successful!");
    // You might want to redirect or perform additional actions upon successful sign-in
  } else {
    alert("Invalid email. Please try again.");
  }
};

function openPage(pageName, elmnt, color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  };
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  };
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
};

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

// add rows to firebase

let submitrowbtn = document.querySelector('#submitrowbtn');

submitrowbtn.addEventListener('click', function(event) {

  event.preventDefault();

  let tblrow = {
    quarter: document.querySelector("#quarter").value,
    bisfunction: document.querySelector("#bisfunction").value,
    taskcat: document.querySelector("#taskcat").value,
    task: document.querySelector("#task").value,
    startdate: document.querySelector("#startdate").value,
    enddate: document.querySelector("#enddate").value,
    collaborators: document.querySelector("#collaborators").value,
    comments: document.querySelector("#comments").value,
  };

  db.collection("tableview").add(tblrow).then(() => alert("new row added!"));
});

// show rows in table on website

db.collection("tableview").get().then((data) => {
  let docs = data.docs;

  let fullTable = document.querySelector("#fullTable");
  let tbody = fullTable.querySelector("tbody");

  docs.forEach(doc =>{
    let newRow = document.createElement("tr");
    newRow.innerHTML=`
      <td>
        <label for="statuscheckbox"></label>
      </td>
      <td>${doc.data().quarter} <input type="hidden" value = "${doc.data().quarter}"/></td>
      <td>${doc.data().bisfunction} <input type="hidden" value = "${doc.data().bisfunction}"/></td>
      <td>${doc.data().taskcat} <input type="hidden" value = "${doc.data().taskcat}"/></td>
      <td>${doc.data().task} <input type="hidden" value = "${doc.data().task}"/></td>
      <td>${doc.data().startdate} <input type="hidden" value = "${doc.data().startdate}"/></td>
      <td>${doc.data().enddate} <input type="hidden" value = "${doc.data().enddate}"/></td>
      <td>${doc.data().collaborators} <input type="hidden" value = "${doc.data().collaborators}"/></td>
      <td>${doc.data().comments} <input type="hidden" value = "${doc.data().comments}"/></td>
      <td>
        <button onclick="update_doc(this, '${doc.id}')">Edit</button>
        <button onclick="del_doc('${doc.id}')">Delete</button>
      </td>
    `;

    tbody.appendChild(newRow);
  });

});

