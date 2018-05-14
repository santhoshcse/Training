var contactsObj = [];
var contacts = null;
//window.addEventListener('load', init);
window.onload = init;
function init(){
    contacts = document.getElementById("contacts");
    console.log(contacts);
    var tableContent = "<table><tr><th>Name</th><th>Mobile Number</th><th>EMail</th><th>DOB</th><th>Address</th><th>State</th></tr></table>";
    contacts.innerHTML = tableContent;// + JSON.parse(contacts-data);
    var add = document.getElementById("Add");
    add.onclick = addContactPage;
    // var update = document.getElementById("Update");
    // update.onclick = fetchJSONFile('contacts.json', function(data){
    //     console.log(data);
    // });
}
function addContactPage(){
    //window.location = "contact-form.html";
    var createContact = document.getElementById("Add-Contact");
    createContact.onclick = addContact;
}
function addContact(){

}
function fetchJSONFile(path, callback) {
    // var httpRequest = new XMLHttpRequest();
    // httpRequest.onreadystatechange = function() {
    //     if (httpRequest.readyState === 4) {
    //         if (httpRequest.status === 200) {
    //             var data = JSON.parse(httpRequest.responseText);
    //             if (callback) callback(data);
    //         }
    //     }
    // };
    // httpRequest.open('GET', path);
    // httpRequest.send(); 
}