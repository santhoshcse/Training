var contactsObj = [];
var contacts = null;
window.onload = init;
function init(){
    contacts = document.getElementById("contacts-list");
    // console.log(contacts);
    loadContacts();
    var add = document.getElementById("Add");
    //add.onclick = addContactPage;
    var update = document.getElementById("Update");
    var add_Contact = document.getElementById("Add-Contact");
    add_Contact.onclick = addContact;
    var reset = document.getElementById("Reset");
    reset.onclick = resetForm;
    // update.onclick = fetchJSONFile('contacts.json', function(data){
    //     console.log(data);
    // });
    // update.onclick = fetchJSONFile('contact-form.html', function(data){
    //     console.log(data);
    // });
}
function loadContacts(){
    var tableContent = "<table><tr><th>Name</th><th>Mobile Number</th><th>EMail</th><th>DOB</th><th>Address</th><th>State</th></tr>";
    var jsonContacts = JSON.parse(localStorage.getItem("contacts"));
    if(jsonContacts != null){
        var tempData = "";
        jsonContacts.forEach(contact => {
            tempData += "<tr>" + "<td>" + contact.name + "</td>" + "<td>" + contact.phone + "</td>" + "<td>" + contact.email + "</td>" + "<td>" + contact.email + "</td>" + "<td>" + contact.address + "</td>" + "<td>" + contact.state + "</td>" + "</tr>";
        });
        tableContent += tempData;
        tableContent += "</table>";
        contacts.innerHTML = tableContent;
    }
}
/*function addContactPage(){
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
}*/
function addContact(){
    var _name = document.getElementById("name").value;
    var _phone = document.getElementById("phone").value;
    var _email = document.getElementById("email").value;
    var _address = document.getElementById("address").value;
    var stateOp = document.getElementById("state");
    var _state = stateOp.options[stateOp.selectedIndex].text;
    var jsonContacts = JSON.parse(localStorage.getItem("contacts"));
    console.log( typeof jsonContacts);
    if(jsonContacts == null){
        jsonContacts = [{
            "name": _name, 
            "phone": _phone, 
            "email": _email, 
            "address": _address, 
            "state": _state
        }];
    }
    else{
        jsonContacts.push({
            "name": _name, 
            "phone": _phone, 
            "email": _email, 
            "address": _address, 
            "state": _state
        });
        console.log(jsonContacts);
        // var arrr = [];
        // arrr.push(jsonContacts);
        // arrr.push({
        //     "name": _name, 
        //     "phone": _phone, 
        //     "email": _email
        // });
        // jsonContacts = arrr;
    }
    localStorage.setItem("contacts", JSON.stringify(jsonContacts));
    // console.log(jsonContacts);
    // localStorage.setItem("name", _name);
    // localStorage.setItem("phone", _phone);
    // console.log(localStorage.getItem("name"));
    // console.log(localStorage.getItem("phone"));
    resetForm();
    loadContacts();
}
function resetForm(){
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("address").value = "";
    var stateOp = document.getElementById("state");
    stateOp.selectedIndex = 0;
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