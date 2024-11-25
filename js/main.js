
// Global variables

var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableData = document.getElementById("tableData");
var bookmarksList = [];



// Display bookmarks data on the page
if (localStorage.getItem("bookContainer") !== null) {
    bookmarksList = JSON.parse(localStorage.getItem("bookContainer"));
    displayBookmark();
}

// Function to add a new bookmark
function addBookmark() {
    if (validationName() && validationUrl()) {
        var bookmark = {
            name: siteName.value,
            site: siteURL.value,
        };

        bookmarksList.push(bookmark);
        localStorage.setItem("bookContainer", JSON.stringify(bookmarksList));
        console.log(bookmark);

        displayBookmark();
        clearInputs();

    }
}
// Function to display bookmarks in the table
function displayBookmark() {

    var x = "";
    for (var i = 0; i < bookmarksList.length; i++) {
        x += ` <tr>
                <td>${i + 1}</td>
                <td>${bookmarksList[i].name}</td>
                
                <td><a href="${bookmarksList[i].site}" target="_blank" class="btn btn-success"><i class="fa-solid fa-eye onclick="visitSite(${i})" " ></i> Visit</a></td>
               
                <td><button class="btn btn-danger" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-can "></i> Delete</button></td>
            </tr>`;
    }
    document.getElementById("tableData").innerHTML = x;
}

// Function to clear inputs

function clearInputs() {
    siteName.value = "";
    siteURL.value = "";

    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
}

// Function to delete a bookmark
function deleteBookmark(index) {

    bookmarksList.splice(index, 1);
    localStorage.setItem("bookContainer", JSON.stringify(bookmarksList));

    displayBookmark();
}

// Function to visit a site

function visitSite(index) {
    window.open(bookmarksList[index].site, "_blank");
}

// Function validation URL & NAME of site
function validationUrl() {

    var regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    var text = siteURL.value;
    var msgUrl = document.getElementById("msgUrl");
    if (regex.test(text)) {
      
        siteURL.classList.add("is-valid");
        siteURL.classList.remove("is-invalid");
        msgUrl.classList.add("d-none");
        return true;
    } else {
       
        siteURL.classList.add("is-invalid");
        siteURL.classList.remove("is-valid");
        msgUrl.classList.remove("d-none");
        return false;
    }
}

function validationName() {

    var regex = /^[a-zA-Z][a-zA-Z0-9 _-]{2,19}$/; 
    var text = siteName.value;
    var msgName = document.getElementById("msgName");

    if (regex.test(text)) {
  
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
        msgName.classList.add("d-none");
        return true;
    } else {
    
        siteName.classList.add("is-invalid");
        siteName.classList.remove("is-valid");
        msgName.classList.remove("d-none");
        return false;
    }
}