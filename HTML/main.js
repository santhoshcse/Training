var contactsObj = [];
var contacts = null;
var sortFlag = false;
window.onload = init;
function init(){
    contacts = document.getElementById("contacts-list");
    // console.log(contacts);
    setMaxDataAsToday();
    setMinDateAs100BeforeToday();
    loadContacts();
    // var add = document.getElementById("Add");
    //add.onclick = addContactPage;
    // var update = document.getElementById("Update");
    var deleteBtn = document.getElementById("Delete");
    deleteBtn.onclick = deleteSelected;
    var selectAll = document.getElementById("Select-All");
    selectAll.onclick = selectAllContacts;
    var unSelectAll = document.getElementById("UnSelect-All");
    unSelectAll.onclick = unSelectAllContacts;
    var _export = document.getElementById("Export-CSV");
    _export.onclick = exportContacts;
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
function sortByName(id){
    var down = document.getElementById("sort-rev");
    if(!sortFlag){
        sortFlag = true;
        down.style.display = "none";
        ascending();
    }
    else{
        var up = document.getElementById(id);
        up.style.display = "none";
        down.style.display = "block";
        descending();
    }
}
function sortByNameReverse(id){
    var up = document.getElementById("sort");
    if(!sortFlag){
        sortFlag = true;
        up.style.display = "none";
        descending();
    }
    else{
        var down = document.getElementById(id);
        down.style.display = "none";
        up.style.display = "block";
        ascending();
    }
}
function ascending(){

}
function descending(){

}
function exportContacts(){
    var csvContent = "data:text/csv;charset=utf-8;,";
    var jsonContacts = JSON.parse(localStorage.getItem("contacts"));
    csvContent += "Name,Phone,Email,DOB,Address,State\r\n";
    jsonContacts.forEach(function(contact){
        var temp = null;
        if(contact.state == "Select State"){
            temp = "";
        }
        else{
            temp = contact.state;
        }
        csvContent += contact.name + "," + contact.phone.toString() + "," + contact.email + "," + contact.dob + "," + contact.address + "," + temp + "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    // window.open(encodedUri);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "contacts.csv");
    link.innerHTML= "Click Here to download";
    document.body.appendChild(link);
    link.click(); 
    // link.style.display = "none";
    document.body.removeChild(link);
}
function setMinDateAs100BeforeToday(){
    var minDate = new Date();
    var yyyy = minDate.getFullYear() - 100;
    var dd = "01";
    var mm = "01";
    minDate = yyyy + "-" + mm + "-" + dd;
    document.getElementById("dob").setAttribute("min", minDate);
}
function setMaxDataAsToday(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
        dd = '0' + dd;
    }
    if(mm<10){
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("dob").setAttribute("max", today);
}
function unSelectAllContacts(){
    var checkboxes = document.getElementsByName("select-contact");
    var selectedCheckboxes = [];
    for (let index = 0; index < checkboxes.length; index++) {
        var element = checkboxes[index];
        element.checked = false;
    }
}
function selectAllContacts(){
    var checkboxes = document.getElementsByName("select-contact");
    var selectedCheckboxes = [];
    for (let index = 0; index < checkboxes.length; index++) {
        var element = checkboxes[index];
        element.checked = true;
    }
}
function loadContacts(){
    sortFlag = false;
    var jsonContacts = JSON.parse(localStorage.getItem("contacts"));
    if(jsonContacts != null && jsonContacts.length > 0){
        var tableContent = "<table id=\"list\" border=\"1\"><tr><th>Select</th><th><div style=\"float:left\">Name</div><div style=\"float:right\"><img src=\"up.svg\" alt=\"Ascending Order\" height=\"12\" width=\"12\" onclick=\"sortByName(this.id)\" id=\"sort\" title=\"Ascending Sort\" ></div><div style=\"float:right\"><img src=\"down.svg\" alt=\"Descending Order\" height=\"12\" width=\"12\" onclick=\"sortByNameReverse(this.id)\" id=\"sort-rev\" title=\"Descending Sort\" ></div></th><th>Mobile Number</th><th>EMail</th><th>DOB</th><th>Address</th><th>State</th><th>Actions</th></tr>";
        var tempData = "";
        var chkboc_value = 0;
        jsonContacts.forEach(function(contact) {
            if(contact.state == "Select State"){
                contact.state = "";
            }
            tempData += "<tr>" + "<td><input type=\"checkbox\" name=\"select-contact\" value=\"" + chkboc_value + "\" ></td>" + "<td>" + contact.name + "</td>" + "<td>" + contact.phone + "</td>" + "<td>" + contact.email + "</td>" + "<td>" + contact.dob + "</td>" + "<td>" + contact.address + "</td>" + "<td>" + contact.state + "</td>" + "<td>&nbsp;<img src=\"delete.png\" alt=\"delete contact\" height=\"25\" width=\"25\" onclick=\"deleteUpdate(this.id)\" id=\"" + chkboc_value + "-delete\" class=\"delete-icon\" title=\"delete contact\" >&nbsp;&nbsp;<img src=\"edit.svg\" alt=\"Update contact\" height=\"25\" width=\"25\" onclick=\"deleteUpdate(this.id)\" id=\"" + chkboc_value + "-update\" class=\"update-icon\" title=\"edit contact\" ></td>" + "</tr>";
            chkboc_value ++;
        });
        tableContent += tempData;
        tableContent += "</table>";
        contacts.innerHTML = tableContent;
        // deleteUpdate();
    }
    else{
        contacts.innerHTML = null;
    }
}
function deleteUpdate(clickedImg){
    // console.log(clickedImg);
    var rowNumber = parseInt(clickedImg);
    // console.log(rowNumber);
    var cmd = clickedImg.split('-');
    // console.log(cmd[1]);
    if(cmd[1] == "delete"){
        deleteContact(rowNumber);
    }
    else if(cmd[1] == "update"){
        toUpdate(rowNumber);
    }
    // var elems = document.getElementsByClassName("delete-icon");
    // var imgIn = 0;
    // Array.from(elems).forEach(function(v) {
    //     v.addEventListener('click', testing(imgIn));
    //     imgIn ++;
    // });
}
function deleteContact(rowNumber){
    var jsonContacts = JSON.parse(localStorage.getItem("contacts"));
    var tempContacts = [];
    var it = 0;
    jsonContacts.forEach(function(contact) {
        if(it == rowNumber){
            //Nothing to do
        }
        else{
            tempContacts.push(contact);
            // console.log(contact.name);
        }
        it ++;
    });
    jsonContacts = tempContacts;
    localStorage.setItem("contacts", JSON.stringify(jsonContacts));
    loadContacts();
}
function toUpdate(rowNumber){
    var jsonContacts = JSON.parse(localStorage.getItem("contacts"));
    var _name = document.getElementById("name");
    _name.value = jsonContacts[rowNumber].name;
    var _phone = document.getElementById("phone");
    _phone.value = jsonContacts[rowNumber].phone;
    var _email = document.getElementById("email");
    _email.value = jsonContacts[rowNumber].email;
    var _dob = document.getElementById("dob");
    _dob.value = jsonContacts[rowNumber].dob;
    var _address = document.getElementById("address");
    _address.value = jsonContacts[rowNumber].address;
    var stateOp = document.getElementById("state");
    // var _state = stateOp.options[stateOp.selectedIndex].text;
    // stateOp.options[rowNumber];
    // stateOp.selectedIndex = rowNumber;
    // stateOp.selectedIndex = jsonContacts[rowNumber].state;
    if(jsonContacts[rowNumber].state == "Select State"){
        stateOp.selectedIndex = 0;
    }
    else{
        stateOp.value = jsonContacts[rowNumber].state;
    }

    var add_Contact = document.getElementById("Add-Contact");
    add_Contact.style.display = "none";
    var update_Contact = document.getElementById("Update-Contact");
    update_Contact.style.display = "block";
    var reset = document.getElementById("Reset");
    reset.style.display = "none";
    var cancel = document.getElementById("Cancel");
    cancel.style.display = "block";
    cancel.onclick = cancelUpdate;
    update_Contact.onclick = function(){
        updateContact(rowNumber);
    }
}
function cancelUpdate(){
    var add_Contact = document.getElementById("Add-Contact");
    add_Contact.style.display = "block";
    var update_Contact = document.getElementById("Update-Contact");
    update_Contact.style.display = "none";
    var reset = document.getElementById("Reset");
    reset.style.display = "block";
    var cancel = document.getElementById("Cancel");
    cancel.style.display = "none";
    resetForm();
}
function updateContact(rowNumber){
    console.log(rowNumber);
    var _name = document.getElementById("name").value;
    var _phone = document.getElementById("phone").value;
    var _email = document.getElementById("email").value;
    var _dob = document.getElementById("dob").value;
    var isValid = validateInput(_name, _phone, _email, _dob);
    if(isValid){
        var _address = document.getElementById("address").value;
        var stateOp = document.getElementById("state");
        var _state = stateOp.options[stateOp.selectedIndex].text;
        var jsonContacts = JSON.parse(localStorage.getItem("contacts"));
        // console.log( typeof jsonContacts);
        if(jsonContacts == null){
            jsonContacts = [{
                "name": _name, 
                "phone": _phone, 
                "email": _email, 
                "dob": _dob, 
                "address": _address, 
                "state": _state
            }];
        }
        else{
            jsonContacts.splice(rowNumber, 1); //if not deleted anything
            jsonContacts.splice(rowNumber, 0, {
                "name": _name, 
                "phone": _phone, 
                "email": _email, 
                "dob": _dob, 
                "address": _address, 
                "state": _state
            });
        }
        localStorage.setItem("contacts", JSON.stringify(jsonContacts));
        var error = document.getElementById("Error-Msg");
        error.innerHTML = "Contact Updated";
        error.style.display = "block";
        setTimeout(function() {
            error.innerHTML = null;
            error.style.display = "none";
        }, 5000);
        cancelUpdate();
        // resetForm();
        loadContacts();
    }
    else{
        var error = document.getElementById("Error-Msg");
        error.style.display = "block";
        // resetForm();
        setTimeout(function() {
            error.innerHTML = null;
            error.style.display = "none";
        }, 5000);
    }
}
function testing(imgIndex){
    // this.parentElement.getElementsByClassName('content')[0].classList.toggle('hidden');
    // alert(imgIndex);
    console.log("testing");
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
    var _dob = document.getElementById("dob").value;
    var isValid = validateInput(_name, _phone, _email, _dob);
    if(isValid){
        var _address = document.getElementById("address").value;
        var stateOp = document.getElementById("state");
        var _state = stateOp.options[stateOp.selectedIndex].text;
        var jsonContacts = JSON.parse(localStorage.getItem("contacts"));
        // console.log( typeof jsonContacts);
        if(jsonContacts == null){
            jsonContacts = [{
                "name": _name, 
                "phone": _phone, 
                "email": _email, 
                "dob": _dob, 
                "address": _address, 
                "state": _state
            }];
        }
        else{
            jsonContacts.push({
                "name": _name, 
                "phone": _phone, 
                "email": _email, 
                "dob": _dob, 
                "address": _address, 
                "state": _state
            });
            // console.log(jsonContacts);
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
        var error = document.getElementById("Error-Msg");
        error.innerHTML = "Contact Added";
        error.style.display = "block";
        setTimeout(function() {
            error.innerHTML = null;
            error.style.display = "none";
        }, 5000);
        resetForm();
        loadContacts();
    }
    else{
        var error = document.getElementById("Error-Msg");
        // error.innerHTML = "Error";
        error.style.display = "block";
        // resetForm();
        setTimeout(function() {
            error.innerHTML = null;
            error.style.display = "none";
        }, 5000);
    }
}
function validateInput(_name, _phone, _email, _dob){
    //TODO
    var error = document.getElementById("Error-Msg");
    if(_name.length == 0){
        error.innerHTML = "Name is Empty";
        return false;
    }
    else if(_phone.length == 0){
        error.innerHTML = "Phone Number is Empty";
        return false;
    }
    else if(!isPhoneNumber(_phone)){
        error.innerHTML = "Phone Number should have only digits";
        return false;
    }
    else if(_phone.length < 10){
        error.innerHTML = "Phone Number should be 10 digit";
        return false;
    }
    else if(_email != "" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(_email))){
        error.innerHTML = "InValid Email ID";
        return false;
    }
    else if(_dob != "" && !checkDOB(_dob)){
        error.innerHTML = "DOB is Invalid";
        return false;
    }
    else{
        return true;
    }
}
function checkDOB(_dob){
    // var dat = _dob.split('-');
    var newDate = new Date(_dob);
    // var yyyy = parseInt(dat[0]);
    // var mm = parseInt(dat[1]);
    // var dd = parseInt(dat[2]);
    var date = new Date();
    var minYear = date.getFullYear() - 100;
    // var maxYear = date.getFullYear();
    // var minMonth = 01;
    // var maxMonth = 
    var minDate = new Date(minYear + "-01-01");
    if(!(newDate <= date && newDate >= minDate)){
        return false;
    }
    // if(!(yyyy >= minYear & yyyy <= maxYear)){
    //     // alert("ok");
    //     return false;
    // }
    // console.log(dat);
    return true;
}
function isPhoneNumber(_phone){
    var flag = true;
    for (let index = 0; index < _phone.length; index++) {
        if((_phone[index] >= 'A' && _phone[index] <= 'Z') || (_phone[index] >= 'a' && _phone[index] <= 'z')){
            flag = false;
            break;
        }
    };
    return flag;
}
function resetForm(){
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("address").value = "";
    var stateOp = document.getElementById("state");
    stateOp.selectedIndex = 0;
}
function deleteSelected(){
    var checkboxes = document.getElementsByName("select-contact");
    var selectedCheckboxes = [];
    for (let index = 0; index < checkboxes.length; index++) {
        var element = checkboxes[index];
        if(element.checked){
            selectedCheckboxes.push(parseInt(element.value));
        }
    }
    if(selectedCheckboxes.length == 0){
        alert("Select any one record to proceed..!");
    }
    else{
        var jsonContacts = JSON.parse(localStorage.getItem("contacts"));
        var tempContacts = [];
        // selectedCheckboxes.forEach(value => {
        //     // jsonContacts.slice(value, 1);
        //     alert(value);
        // });
        var it = 0;
        console.log(selectedCheckboxes);
        jsonContacts.forEach(function(contact) {
            if(selectedCheckboxes.includes(it)){ // if it present in selectedCheckboxes
            // if(it in selectedCheckboxes){ // checks index
                //Nothing to do
                // console.log(it);
            }
            else{
                tempContacts.push(contact);
                // console.log(contact.name);
            }
            it ++;
        });
        jsonContacts = tempContacts;
        localStorage.setItem("contacts", JSON.stringify(jsonContacts));
        loadContacts();
    }
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