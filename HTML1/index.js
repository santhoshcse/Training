class Contact {
    constructor(id, name, phoneNumber, email, dateOfBirth, address, state) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.state = state;
    }
    setId(id){
        this.id = id;
    }
    getId(){
        return this.id;
    }
    setName(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
    setPhoneNumber(phoneNumber){
        this.phoneNumber = phoneNumber;
    }
    getPhoneNumber(){
        return this.phoneNumber;
    }
    setEmail(email){
        this.email = email;
    }
    getEmail(){
        return this.email;
    }
    setDateOfBirth(dateOfBirth){
        this.dateOfBirth = dateOfBirth;
    }
    getDateOfBirth(){
        return this.dateOfBirth;
    }
    setAddress(address){
        this.address = address;
    }
    getAddress(){
        return this.address;
    }
    setState(state){
        this.state = state;
    }
    getState(){
        return this.state;
    }
    toString(){
        return "id: " + this.getId() + ", name: " + this.getName() + ", phoneNumber: " + this.getPhoneNumber() + ", email: " + this.getEmail() + ", dateOfBirth: " + this.getDateOfBirth() + ", address: " + this.getAddress() + ", state: " + this.getState();
    }
}
// Holds complete contacts list
contactList = [];

var contacts = null;
var sortFlag = false;
window.onload = function (){
    // sample records
    var date1 = new Date("2018-05-21");
    var str = date1.getFullYear() + "-" + (date1.getMonth()+1) + "-" + date1.getDate();
    var contact1 = new Contact(1, "Santhosh", 9003435809, "gsaku0091@gmail.com", str, "Coimbatore", "TamilNadu");
    date1 = new Date("2018-04-21");
    str = date1.getFullYear() + "-" + (date1.getMonth()+1) + "-" + date1.getDate();
    var contact2 = new Contact(2, "Kumar", 9003689126, "gsaku0092@gmail.com", str, "Chennai", "TamilNadu");
    contactList.push(contact1);
    contactList.push(contact2);

    contacts = document.getElementById("contacts-list");
    setMaxDataAsToday();
    setMinDateAs100BeforeToday();
    loadContacts();
    var deleteBtn = document.getElementById("Delete");
    deleteBtn.onclick = deleteSelected;
    var selectAll = document.getElementById("Select-All");
    selectAll.onclick = selectAllContacts;
    var unSelectAll = document.getElementById("UnSelect-All");
    unSelectAll.onclick = unSelectAllContacts;
    var add_Contact = document.getElementById("Add-Contact");
    add_Contact.onclick = addContact;
    var reset = document.getElementById("Reset");
    reset.onclick = resetForm;
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
    var jsonContacts = contactList;
    if(jsonContacts != null && jsonContacts.length > 0){
        var tableContent = "<table id=\"list\" border=\"1\"><thead><tr><th>Select</th><th><div style=\"float:left\">Name</div><div style=\"float:right\"><img src=\"up.svg\" alt=\"Ascending Order\" height=\"12\" width=\"12\" onclick=\"sortByName(this.id)\" id=\"sort\" title=\"Ascending Sort\" ></div><div style=\"float:right\"><img src=\"down.svg\" alt=\"Descending Order\" height=\"12\" width=\"12\" onclick=\"sortByNameReverse(this.id)\" id=\"sort-rev\" title=\"Descending Sort\" ></div></th><th>Mobile Number</th><th>EMail</th><th>DOB</th><th>Address</th><th>State</th><th>Actions</th></tr></thead><tbody>";
        var tempData = "";
        var chkboc_value = 0;
        jsonContacts.forEach(function(contact) {
            if(contact.state == "Select State"){
                contact.state = "";
            }
            tempData += "<tr>" + "<td><input type=\"checkbox\" name=\"select-contact\" value=\"" + chkboc_value + "\" ></td>" + "<td>" + contact.name + "</td>" + "<td>" + contact.phoneNumber + "</td>" + "<td>" + contact.email + "</td>" + "<td>" + contact.dateOfBirth + "</td>" + "<td>" + contact.address + "</td>" + "<td>" + contact.state + "</td>" + "<td>&nbsp;<img src=\"delete.png\" alt=\"delete contact\" height=\"25\" width=\"25\" onclick=\"deleteUpdate(this.id)\" id=\"" + chkboc_value + "-delete\" class=\"delete-icon\" title=\"delete contact\" >&nbsp;&nbsp;<img src=\"edit.svg\" alt=\"Update contact\" height=\"25\" width=\"25\" onclick=\"deleteUpdate(this.id)\" id=\"" + chkboc_value + "-update\" class=\"update-icon\" title=\"edit contact\" ></td>" + "</tr>";
            chkboc_value ++;
        });
        tableContent += tempData;
        tableContent += "</tbody></table>";
        contacts.innerHTML = tableContent;
    }
    else{
        contacts.innerHTML = "";//null;
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
}
function deleteContact(rowNumber){
    var jsonContacts = contactList;//JSON.parse(localStorage.getItem("contacts"));
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
    contactList = tempContacts;
    // jsonContacts = tempContacts;
    // localStorage.setItem("contacts", JSON.stringify(jsonContacts));
    loadContacts();
}
function toUpdate(rowNumber){
    var jsonContacts = contactList;//JSON.parse(localStorage.getItem("contacts"));
    var _name = document.getElementById("name");
    _name.value = jsonContacts[rowNumber].name;
    var _phone = document.getElementById("phone");
    _phone.value = jsonContacts[rowNumber].phoneNumber;
    var _email = document.getElementById("email");
    _email.value = jsonContacts[rowNumber].email;
    var _dob = document.getElementById("dob");
    _dob.value = jsonContacts[rowNumber].dateOfBirth;
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
        var jsonContacts = contactList;//JSON.parse(localStorage.getItem("contacts"));
        // console.log( typeof jsonContacts);
        if(jsonContacts == null){
            jsonContacts = [{
                "name": _name, 
                "phoneNumber": _phone, 
                "email": _email, 
                "dateOfBirth": _dob, 
                "address": _address, 
                "state": _state
            }];
        }
        else{
            jsonContacts.splice(rowNumber, 1); //if not deleted anything
            jsonContacts.splice(rowNumber, 0, {
                "name": _name, 
                "phoneNumber": _phone, 
                "email": _email, 
                "dateOfBirth": _dob, 
                "address": _address, 
                "state": _state
            });
        }
        // localStorage.setItem("contacts", JSON.stringify(jsonContacts));
        contactList = jsonContacts;
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
        var jsonContacts = contactList;//JSON.parse(localStorage.getItem("contacts"));
        // console.log( typeof jsonContacts);
        if(jsonContacts == null){
            jsonContacts = [{
                "name": _name, 
                "phoneNumber": _phone, 
                "email": _email, 
                "dateOfBirth": _dob, 
                "address": _address, 
                "state": _state
            }];
        }
        else{
            jsonContacts.push({
                "name": _name, 
                "phoneNumber": _phone, 
                "email": _email, 
                "dateOfBirth": _dob, 
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
        // localStorage.setItem("contacts", JSON.stringify(jsonContacts));
        contactList = jsonContacts;

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
        var jsonContacts = contactList;//JSON.parse(localStorage.getItem("contacts"));
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
        contactList = jsonContacts;
        // jsonContacts = tempContacts;
        // localStorage.setItem("contacts", JSON.stringify(jsonContacts));
        loadContacts();
    }
}