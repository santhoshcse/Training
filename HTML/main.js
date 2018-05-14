var contactsObj = {};
var contacts = null;
window.onload = init;
function init(){
    contacts = document.getElementById("contacts");
    console.log(contacts);
    var tableContent = "<table><tr><th>Name</th><th>Mobile Number</th><th>EMail</th><th>DOB</th><th>Address</th><th>State</th></tr></table>";
    contacts.innerHTML = tableContent;
    var add = document.getElementById("Add");
    add.onclick = addContactPage;
    var update = document.getElementById("Update");
    // update.onclick = fetchJSONFile('contacts.json', function(data){
    //     console.log(data);
    // });
    // update.onclick = fetchJSONFile('contact-form.html', function(data){
    //     console.log(data);
    // });
}
function addContactPage(){
    //window.location = "contact-form.html";
    var att = document.createAttribute("src");
    att.value = "contact-form.html";
    var ht = document.createAttribute("height");
    ht.value = "900";
    var embe = document.createElement("embed");
    embe.setAttributeNode(att);
    embe.setAttributeNode(ht);
    var divele = document.getElementById("main-div");
    divele.appendChild(embe);
    var createContact = document.getElementById("Add-Contact");
    createContact.onclick = addContact;

    // localStorage.setItem('contact', JSON.stringify(contactsObj));
}
function addContact(){
    var _name = document.getElementById("name").value;
    localStorage.setItem("name", _name);
    console.log(localStorage.getItem("name"));
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