// Holds complete contacts list
var contactList = [];
//Global Variables
var contacts = null;
var deleteFlag = true;
var currentRecord = -1;
/**
 * @description returns new Contact Object using Object Literal
 * @param {integer} id 
 * @param {string} name 
 * @param {integer} phoneNumber 
 * @param {string} email 
 * @param {string} dateOfBirth 
 * @param {string} address 
 * @param {string} state 
 */
function newObject(id, name, phoneNumber, email, dateOfBirth, address, state){
    var Contact = {
        id,
        name,
        phoneNumber,
        email,
        dateOfBirth,
        address,
        state
    }
    return Contact;
}
/**
 * @description init function
 */
$(function(){
    // sample records
    var newContact = newObject(1, "Santhosh", 9003435809, "gsaku0091@gmail.com", "2018-05-21", "Coimbatore", "Tamil Nadu");
    contactList.push(newContact);
    newContact = newObject(2, "Kumar", 9003689126, "gsaku0092@gmail.com", "2018-04-21", "Chennai", "Tamil Nadu");
    contactList.push(newContact);
    //Events
    contacts = $("#contacts-list");
    console.log(contacts);
    setMaxDate();
    setMinDate();
    loadContacts();
    var deleteBtn = $("#Delete");
    deleteBtn.click(deleteSelected);
    var selectAll = $("#Select-All");
    selectAll.click(function(){
        selectDeselect(true);
    });
    var unSelectAll = $("#UnSelect-All");
    unSelectAll.click(function(){
        selectDeselect(false);
    });
    var add_Contact = $("#Add-Contact");
    add_Contact.click(addContact);
    var reset = $("#Reset");
    reset.click(resetForm);
});
/**
 * @description sets min attribute for date of birth field
 */
function setMinDate(){
    var minDate = new Date();
    var yyyy = minDate.getFullYear() - 100;
    var dd = "01";
    var mm = "01";
    minDate = yyyy + "-" + mm + "-" + dd;
    $("#dob").attr("min", minDate);
}
/**
 * @description sets max attribute for date of birth field
 */
function setMaxDate(){
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
    $("#dob").attr("max", today);
}
/**
 * @description select / deselect toggle for all checkboxes
 */
function selectDeselect(status){
    var checkboxes = $('[name=select-contact]');
    for (let index = 0; index < checkboxes.length; index++) {
        var element = checkboxes[index];
        element.checked = status;
    }
}
/**
 * @description displays the JSON Object into Table format
 */
function loadContacts(){
    if(contactList.length > 0){
        var tableContent = "<table id=\"list\" border=\"1\"><thead><tr><th>Select</th><th>Name</th><th>Mobile Number</th><th>EMail</th><th>DOB</th><th>Address</th><th>State</th><th>Actions</th></tr></thead><tbody>";
        var tempData = "";
        var chkboc_value = 0;
        contactList.forEach(function(contact) {
            var tempState = contact.state;
            if(tempState == "Select State"){
                tempState = "";
            }
            tempData += "<tr>" + "<td><input type=\"checkbox\" name=\"select-contact\" value=\"" + chkboc_value + "\" ></td>" + "<td>" + contact.name + "</td>" + "<td>" + contact.phoneNumber + "</td>" + "<td>" + contact.email + "</td>" + "<td>" + contact.dateOfBirth + "</td>" + "<td>" + contact.address + "</td>" + "<td>" + tempState + "</td>" + "<td><img src=\"delete.png\" alt=\"delete contact\" height=\"25\" width=\"25\" onclick=\"deleteUpdateUtil(this.id)\" id=\"" + chkboc_value + "-delete\" class=\"delete-icon\" title=\"delete contact\" ><img src=\"edit.svg\" alt=\"Update contact\" height=\"25\" width=\"25\" style=\"margin-left:10px;\" onclick=\"deleteUpdateUtil(this.id)\" id=\"" + chkboc_value + "-update\" class=\"update-icon\" title=\"edit contact\" ></td>" + "</tr>";
            chkboc_value ++;
        });
        tableContent += tempData;
        tableContent += "</tbody></table>";
        contacts.html(tableContent);
    }
    else{
        contacts.html("Empty");
    }
}
/**
 * @description Util function to delete or update the specified record
 * @param {string} clickedImg id of the clicked icon (delete/update)
 */
function deleteUpdateUtil(clickedImg){
    var rowNumber = parseInt(clickedImg);
    currentRecord = rowNumber;
    var cmd = clickedImg.split('-');
    // var rNo = parseInt(cmd[0]);
    if(cmd[1] == "delete"){
        if(deleteFlag){
            deleteContact();//rowNumber
        }
        else{
            alert("Can't delete while updating");
        }
    }
    else if(cmd[1] == "update"){
        toUpdate();//rowNumber
        deleteFlag = false;
        clickable("none");
    }
}
/**
 * @description makes all delete icons unclickable while updating and clickable after updation is done
 */
function clickable(pointerEvent){
    var dIcon = $(".delete-icon");
    dIcon.css("pointerEvents", pointerEvent);
    var del = $("#Delete");
    del.css("pointerEvents", pointerEvent);
}
/**
 * @description Deletes the specified record
 * @param {Number} rowNumber row number of the record to be deleted
 */
function deleteContact(){//rowNumber
    if(confirm("Confirm Delete ?")){
        contactList.splice(currentRecord, 1);//rowNumber
        loadContacts();
    }
}
/**
 * @description Makes Specified Record's data to edit
 * @param {Number} rowNumber 
 */
function toUpdate(){//rowNumber
    var jsonContacts = contactList;
    var _name = $("#name");
    _name.val(jsonContacts[currentRecord].name);//rowNumber
    var _phone = $("#phone");
    _phone.val(jsonContacts[currentRecord].phoneNumber);//rowNumber
    var _email = $("#email");
    _email.val(jsonContacts[currentRecord].email);//rowNumber
    var _dob = $("#dob");
    _dob.val(jsonContacts[currentRecord].dateOfBirth);//rowNumber
    var _address = $("#address");
    _address.val(jsonContacts[currentRecord].address);//rowNumber
    var stateOp = $("#state");
    if(jsonContacts[currentRecord].state == "Select State"){//rowNumber
        stateOp.prop('selectedIndex', 0);
    }
    else{
        stateOp.val(jsonContacts[currentRecord].state);//rowNumber
    }
    var add_Contact = $("#Add-Contact");
    add_Contact.hide();
    var update_Contact = $("#Update-Contact");
    update_Contact.show();
    var reset = $("#Reset");
    reset.hide();
    var cancel = $("#Cancel");
    cancel.show();
    cancel.click(function(){
        cancelUpdate();
    });
    update_Contact.click(function(){
        updateContact();//rowNumber
    });
}
/**
 * @description Cancel the Update Operation
 */
function cancelUpdate(){
    deleteFlag = true;
    var add_Contact = $("#Add-Contact");
    add_Contact.show();
    var update_Contact = $("#Update-Contact");
    update_Contact.hide();
    var reset = $("#Reset");
    reset.show();
    var cancel = $("#Cancel");
    cancel.hide();
    resetForm();
    clickable("auto");
}
/**
 * @description shows notification message for contact creation and updation
 * @param {string} message notification message for creation and updation
 */
function showNotification(message){
    var error = $("#Error-Msg");
    error.html(message);
    error.show();
    setTimeout(function() {
        error.html(null);//""
        error.hide();
    }, 5000);
}
/**
 * @description Updates the specified record
 * @param {Number} rowNumber row number of the record to be updated
 */
function updateContact(){//rowNumber
    var _name = $("#name").val();
    var _phone = $("#phone").val();
    var _email = $("#email").val();
    var _dob = $("#dob").val();
    var isValid = validateInput(_name, _phone, _email, _dob);
    if(isValid){
        var _address = $('#address').val();
        var _state = $("#state").val();
        var newId = contactList[currentRecord].id;//rowNumber
        // contactList.splice(rowNumber, 1);
        var newContact = newObject(newId, _name, _phone, _email, _dob, _address, _state);
        contactList.splice(currentRecord, 1, newContact);//0 //rowNumber
        showNotification("Contact Updated");
        cancelUpdate();
        loadContacts();
    }
    else{
        var error = $("#Error-Msg");
        error.show();
    }
}
/**
 * @description Adds new Contact
 */
function addContact(){
    var _name = $("#name").val();
    var _phone = $("#phone").val();
    var _email = $("#email").val();
    var _dob = $("#dob").val();
    var isValid = validateInput(_name, _phone, _email, _dob);
    if(isValid){
        var _address = $("#address").val();
        var _state = $("#state").val();
        var newContact = null;
        if(contactList.length == 0){
            newContact = newObject(1, _name, _phone, _email, _dob, _address, _state);
        }
        else{
            var newId = contactList[contactList.length-1].id+1;
            newContact = newObject(newId, _name, _phone, _email, _dob, _address, _state);
        }
        contactList.push(newContact);
        showNotification("Contact Added");
        resetForm();
        loadContacts();
    }
    else{
        var error = $("#Error-Msg");
        error.show();
    }
}
/**
 * @description validates name, phone, email, dob
 * @param {string} _name 
 * @param {string} _phone 
 * @param {string} _email 
 * @param {string} _dob 
 */
function validateInput(_name, _phone, _email, _dob){
    var error = $("#Error-Msg");
    if(_name.length == 0){
        error.html("Name is Empty");
        return false;
    }
    else if(_phone.length == 0){
        error.html("Phone Number is Empty");
        return false;
    }
    else if(!isPhoneNumber(_phone)){
        error.html("Phone Number should have only digits");
        return false;
    }
    else if(_phone.length < 10){
        error.html("Phone Number should be 10 digit");
        return false;
    } 
    else if(_email != "" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(_email))){
        error.html("InValid Email ID");
        return false;
    }
    else if(_dob != "" && !checkDOB(_dob)){
        error.html("DOB is Invalid");
        return false;
    }
    return true;
}
/**
 * @description Validates the date with min and max attribute
 * @param {string} _dob 
 */
function checkDOB(_dob){
    var newDate = new Date(_dob);
    var date = new Date();
    var minYear = date.getFullYear() - 100;
    var minDate = new Date(minYear + "-01-01");
    if(!(newDate <= date && newDate >= minDate)){
        return false;
    }
    return true;
}
/**
 * @description Validates the phone number
 * @param {string} _phone 
 */
function isPhoneNumber(_phone){
    var flag = true;
    for (let index = 0; index < _phone.length; index++) {
        if((_phone[index] >= 'A' && _phone[index] <= 'Z') || (_phone[index] >= 'a' && _phone[index] <= 'z')){
            flag = false;
            break;
        }
    }
    return flag;
}
/**
 * @description Resets the input fields
 */
function resetForm(){
    $("#name").val("");
    $("#phone").val("");
    $("#email").val("");
    $("#dob").val("");
    $("#address").val("");
    var stateOp = $("#state");
    stateOp.prop('selectedIndex', 0);
}
/**
 * @description Deletes all selected records
 */
function deleteSelected(){
    if(deleteFlag){
        var checkboxes = $("[name=select-contact]");
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
            if(confirm("Confirm Delete ?")){
                var tempContacts = [];
                var it = 0;
                console.log(selectedCheckboxes);
                contactList.forEach(function(contact) {
                    if(!selectedCheckboxes.includes(it)){
                        tempContacts.push(contact);
                    }
                    it ++;
                });
                contactList = tempContacts;
                loadContacts();
            }
        }
    }
    else{
        alert("Can't delete while updating");
    }
}