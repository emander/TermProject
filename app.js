// functions

function del_doc_tv(id) {
  db.collection("tableview")
    .doc(id)
    .delete()
    .then(() => alert("row deleted"));
}

function update_doc_tv(ele, id) {
  // alert(ele);
  // alert(id);
  console.log(ele);

  let edit_btn_tv = document.querySelector("#edit_btn_tv");
  edit_btn_tv.classList.add("is-hidden");

  let inputs = ele.parentNode.parentNode.querySelectorAll("input");

  inputs[0].type = "text";
  inputs[1].type = "number";
  inputs[2].type = "text";
  inputs[3].type = "text";
  inputs[4].type = "text";
  inputs[5].type = "date";
  inputs[6].type = "date";
  inputs[7].type = "text";
  inputs[8].type = "text";

  let button_tv = document.querySelector('#button_tv');

  let sub_edit_btn_tv = document.createElement("button");
  sub_edit_btn_tv.id = "sub_edit_btn_tv";
  sub_edit_btn_tv.textContent = "Submit Edit";

  sub_edit_btn_tv.addEventListener("click", function () {
    update_fb_tv(id, inputs);
  });

  button_tv.appendChild(sub_edit_btn_tv);
};

function update_fb_tv(id, inputs){
  db.collection("tableview")
    .doc(id)
    .update({
      status: inputs[0].value,
      quarter: inputs[1].value,
      bisfunction: inputs[2].value,
      taskcat: inputs[3].value,
      task: inputs[4].value,
      startdate: inputs[5].value,
      enddate: inputs[6].value,
      collaborators: inputs[7].value,
      comments: inputs[8].value,
    })
    .then(() => alert("Updates saved!"));
};

function del_doc_ann(id) {
  db.collection("announcements")
    .doc(id)
    .delete()
    .then(() => alert("row deleted"))
    .then(() => refreshFilters());
}

function update_doc_ann(ele, id) {
  console.log(ele);

  let edit_btn_ann = document.querySelector("#edit_btn_ann");
  edit_btn_ann.classList.add("is-hidden");

  let inputs = ele.parentNode.parentNode.querySelectorAll("input");

  inputs[0].type = "date";
  inputs[1].type = "text";
  inputs[2].type = "text";
  inputs[3].type = "text";

  let button_ann = document.querySelector('#button_ann');

  let sub_edit_btn_ann = document.createElement("button");
  sub_edit_btn_ann.id = "sub_edit_btn_ann";
  sub_edit_btn_ann.textContent = "Submit Edit";

  sub_edit_btn_ann.addEventListener("click", function () {
    update_fb_ann(id, inputs);
  });

  button_ann.appendChild(sub_edit_btn_ann);
};

function update_fb_ann(id, inputs){
  db.collection("announcements")
    .doc(id)
    .update({
    date: inputs[0].value,
    author: inputs[1].value,
    title: inputs[2].value,
    announcement: inputs[3].value,
  })
  .then(() => alert("Updates saved!"));
    
};

function close_modal(modal_id) {
  document.querySelector(`#${modal_id}`).classList.remove("is-active");
}

function validateForm() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // List of allowed email addresses
  var allowedEmails = [
    "joanne.esser@wisc.edu",
    "nhia.vang@wisc.edu",
    "megan.armstrong@wisc.edu",
    "kymberly.aebly@wisc.edu",
    "susan.laufenberg@wisc.edu",
    "kathy.mccord@wisc.edu",
    "dswagner2@wisc.edu",
  ];

  // Check if the email is in the allowed list
  if (allowedEmails.includes(email) && password.length >= 8) {
    alert("User successfully validated!");
    return true; // Allow form submission
  } else {
    alert("Invalid email or password!");
    event.preventDefault();
    return false; // Prevent form submission
  }
}

const signedinlinks = document.querySelectorAll(".signedin");
const signedoutlinks = document.querySelectorAll(".signedout");

// TEST STEPHANIE
function configure_nav_bar(userObj) {
  if (userObj) {
    // show all links with signedin class hide all links with signedout class
    signedinlinks.forEach((link) => {
      link.classList.remove("is-hidden");
    });
    signedoutlinks.forEach((link) => {
      link.classList.add("is-hidden");
    });
  } else {
    // show all links with signedout class hide all links with signedin class
    signedoutlinks.forEach((link) => {
      link.classList.remove("is-hidden");
    });
    signedinlinks.forEach((link) => {
      link.classList.add("is-hidden");
    });
  }
}
// TEST STEPHANIE

// sign in modal

let signinbtn = document.querySelector("#signinbtn");
let signinModal = document.querySelector("#signinModal");
let signinModalBg = document.querySelector("#signinModalBg");

let signupbtn = document.querySelector("#signupbtn");
let signupModal = document.querySelector("#signup-modal");
let signupModalBg = document.querySelector("#signup-modalbg");

const signoutbtn = document.querySelector("#signoutbtn");

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
  addrowModal.classList.add("is-active");
});

addrowModalBg.addEventListener("click", () => {
  addrowModal.classList.remove("is-active");
});

// add announcement modal

let addannbtn = document.querySelector("#addannbtn");
let addannModal = document.querySelector("#addannModal");
let addannModalBg = document.querySelector("#addannModalBg");

addannbtn.addEventListener("click", () => {
  addannModal.classList.add("is-active");
});

addannModalBg.addEventListener("click", () => {
  addannModal.classList.remove("is-active");
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

// Sign Up
signup_form.addEventListener("submit", (e) => {
  // prevent auto refresh
  e.preventDefault();

  // grab email and password
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  var allowedEmails = [
    "joanne.esser@wisc.edu",
    "nhia.vang@wisc.edu",
    "megan.armstrong@wisc.edu",
    "kymberly.aebly@wisc.edu",
    "susan.laufenberg@wisc.edu",
    "kathy.mccord@wisc.edu",
    "dswagner2@wisc.edu",
  ];

  // Check if the email is in the allowed list
  if (allowedEmails.includes(email)) {
    alert("A");

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
  } else {
    alert("B");
  }
});

// Sign Up Modal Link
signupbtn.addEventListener("click", () => {
  signupModal.classList.add("is-active");
});

signupModalBg.addEventListener("click", () => {
  signupModal.classList.remove("is-active");
});

// Sign in and Out

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
    // configure_message_bar("The user is now signed in");
    //show user email address at the navigation bar
    configure_nav_bar(user);
    document.querySelector("#user-email").innerHTML = user.email;
  } else {
    // console.log('user is now signed out')
    // configure_message_bar("The user is now signed out");
    configure_nav_bar();
    document.querySelector("#user-email").innerHTML = "";
    document.querySelector("#Announcements").innerHTML =
      "You have to be signed in to see the content.";
  }
});

// Sign Out
function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("User signed out successfully");
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
}

function openPage(pageName, elmnt, color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

// add table rows to firebase

let submitrowbtn = document.querySelector("#submitrowbtn");

submitrowbtn.addEventListener("click", function (event) {
  event.preventDefault();

  let tblrow = {
    status: document.querySelector("#status").value,
    quarter: document.querySelector("#quarter").value,
    bisfunction: document.querySelector("#bisfunction").value,
    taskcat: document.querySelector("#taskcat").value,
    task: document.querySelector("#task").value,
    startdate: document.querySelector("#startdate").value,
    enddate: document.querySelector("#enddate").value,
    collaborators: document.querySelector("#collaborators").value,
    comments: document.querySelector("#comments").value,
  };

  db.collection("tableview")
    .add(tblrow)
    .then(() => alert("new row added!"));
});

// show rows in table on website

db.collection("tableview")
  .get()
  .then((data) => {
    let docs = data.docs;

    let fullTable = document.querySelector("#fullTable");
    let tbody = fullTable.querySelector("tbody");

    docs.forEach((doc) => {
      let newRow = document.createElement("tr");
      newRow.innerHTML = `
      <td>${doc.data().status} <input type="hidden" value = "${
        doc.data().status
      }"/></td>
      <td>${doc.data().quarter} <input type="hidden" value = "${
        doc.data().quarter
      }"/></td>
      <td>${doc.data().bisfunction} <input type="hidden" value = "${
        doc.data().bisfunction
      }"/></td>
      <td>${doc.data().taskcat} <input type="hidden" value = "${
        doc.data().taskcat
      }"/></td>
      <td>${doc.data().task} <input type="hidden" value = "${
        doc.data().task
      }"/></td>
      <td>${doc.data().startdate} <input type="hidden" value = "${
        doc.data().startdate
      }"/></td>
      <td>${doc.data().enddate} <input type="hidden" value = "${
        doc.data().enddate
      }"/></td>
      <td>${doc.data().collaborators} <input type="hidden" value = "${
        doc.data().collaborators
      }"/></td>
      <td>${doc.data().comments} <input type="hidden" value = "${
        doc.data().comments
      }"/></td>
      <td id="button_tv">
        <button id="edit_btn_tv" onclick="update_doc_tv(this, '${doc.id}')">Edit</button>
        <button onclick="del_doc_tv('${doc.id}')">Delete</button>
      </td>
    `;

      tbody.appendChild(newRow);
    });
  });

// add announcement rows in firebase

let submitannbtn = document.querySelector("#submitannbtn");

submitannbtn.addEventListener("click", function (event) {
  event.preventDefault();

  let tblrow = {
    date: document.querySelector("#anndate").value,
    author: document.querySelector("#author").value,
    title: document.querySelector("#jobtitle").value,
    announcement: document.querySelector("#announcement").value,
  };

  db.collection("announcements")
    .add(tblrow)
    .then(() => alert("new row added!"));
});

// show rows in announcements on website

db.collection("announcements")
  .get()
  .then((data) => {
    let docs = data.docs;

    let annTable = document.querySelector("#annTable");
    let annbody = annTable.querySelector("#annbody");

    docs.forEach((doc) => {
      let newRow = document.createElement("tr");
      newRow.innerHTML = `
      <td>${doc.data().date} <input type="hidden" value="${doc.data().date}"/>
      </td>
      <td>${doc.data().author} <input type="hidden" value="${
        doc.data().author
      }"/></td>
      <td>${doc.data().title} <input type="hidden" value = "${
        doc.data().title
      }"/>
      </td>
      <td>${doc.data().announcement} <input type="hidden" value = "${
        doc.data().announcement
      }"/>
      </td>
      <td id="button_ann">
        <button id="edit_btn_ann" onclick="update_doc_ann(this, '${doc.id}')">Edit</button>
        <button onclick="del_doc_ann('${doc.id}')">Delete</button>
      </td>
    `;

      annbody.appendChild(newRow);
    });
  });
