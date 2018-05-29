var ContactManager = {
    contactList : [],
    deleteFlag : true,
    selectors : {
        contacts : "contacts-list",
        deleteBtn : "Delete",
        selectAll : "Select-All",
        unSelectAll : "UnSelect-All",
        add_Contact : "Add-Contact",
        reset : "Reset",
        checkboxes : "select-contact",
        dob : "dob",
        dIcon : "delete-icon",
        name : "name",
        phone : "phone",
        email : "email",
        address : "address",
        state : "state",
        update_Contact : "Update-Contact",
        cancel : "Cancel",
        error : "Error-Msg"
    },
    newObject : function(id, name, phoneNumber, email, dateOfBirth, address, state){
        var Contact = {
            id,
            name,
            phoneNumber,
            email,
            dateOfBirth,
            address,
            state
        };
        return Contact;
    },
    init : function(){
        // Sample Records
        var newContact = ContactManager.newObject(1, "Santhosh", 9003435809, "gsaku0091@gmail.com", "2018-05-21", "Coimbatore", "Tamil Nadu");
        ContactManager.contactList.push(newContact);
        newContact = ContactManager.newObject(2, "Kumar", 9003689126, "gsaku0092@gmail.com", "2018-04-21", "Chennai", "Tamil Nadu");
        ContactManager.contactList.push(newContact);
        // Events
        contacts = document.getElementById(ContactManager.selectors.contacts);
        ContactManager.setMaxDate();
        ContactManager.setMinDate();
        ContactManager.loadContacts();
        var deleteBtn = document.getElementById(ContactManager.selectors.deleteBtn);
        deleteBtn.onclick = ContactManager.deleteSelected;
        var selectAll = document.getElementById(ContactManager.selectors.selectAll);
        selectAll.onclick = function(){
            ContactManager.selectDeselect(true);
        };
        var unSelectAll = document.getElementById(ContactManager.selectors.unSelectAll);
        unSelectAll.onclick = function(){
            ContactManager.selectDeselect(false);
        };
        var add_Contact = document.getElementById(ContactManager.selectors.add_Contact);
        add_Contact.onclick = ContactManager.addContact;
        var reset = document.getElementById(ContactManager.selectors.reset);
        reset.onclick = ContactManager.resetForm;
    },
    setMinDate : function(){
        var minDate = new Date();
        var yyyy = minDate.getFullYear() - 100;
        var dd = "01";
        var mm = "01";
        minDate = yyyy + "-" + mm + "-" + dd;
        document.getElementById(ContactManager.selectors.dob).setAttribute("min", minDate);
    },
    setMaxDate : function(){
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
        document.getElementById(ContactManager.selectors.dob).setAttribute("max", today);
    },
    selectDeselect : function(status){
        var checkboxes = document.getElementsByName(ContactManager.selectors.checkboxes);
        for (let index = 0; index < checkboxes.length; index++) {
            var element = checkboxes[index];
            element.checked = status;
        }
    },
    loadContacts : function(){
        var contacts = document.getElementById(ContactManager.selectors.contacts);
        if(ContactManager.contactList.length > 0){
            var tableContent = "<table id=\"list\" border=\"1\"><thead><tr><th>Select</th><th>Name</th><th>Mobile Number</th><th>EMail</th><th>DOB</th><th>Address</th><th>State</th><th>Actions</th></tr></thead><tbody>";
            var tempData = "";
            var chkboc_value = 0;
            ContactManager.contactList.forEach(function(contact) {
                var tempState = contact.state;
                if(tempState == "Select State"){
                    tempState = "";
                }
                tempData += "<tr>" + "<td><input type=\"checkbox\" name=\"select-contact\" value=\"" + chkboc_value + "\" ></td>" + "<td>" + contact.name + "</td>" + "<td>" + contact.phoneNumber + "</td>" + "<td>" + contact.email + "</td>" + "<td>" + contact.dateOfBirth + "</td>" + "<td>" + contact.address + "</td>" + "<td>" + tempState + "</td>" + "<td><img src=\"delete.png\" alt=\"delete contact\" height=\"25\" width=\"25\" onclick=\"ContactManager.deleteUpdateUtil(id)\" id=\"" + chkboc_value + "-delete\" class=\"delete-icon\" title=\"delete contact\" ><img src=\"edit.svg\" alt=\"Update contact\" height=\"25\" width=\"25\" style=\"margin-left:10px;\" onclick=\"ContactManager.deleteUpdateUtil(id)\" id=\"" + chkboc_value + "-update\" class=\"update-icon\" title=\"edit contact\" ></td>" + "</tr>";
                chkboc_value ++;
            });
            tableContent += tempData;
            tableContent += "</tbody></table>";
            contacts.innerHTML = tableContent;
        }
        else{
            contacts.innerHTML = "Empty";
        }
    },
    deleteUpdateUtil : function(clickedImg){
        var rowNumber = parseInt(clickedImg);
        var cmd = clickedImg.split('-');
        if(cmd[1] == "delete"){
            if(ContactManager.deleteFlag){
                ContactManager.deleteContact(rowNumber);
            }
            else{
                alert("Can't delete while updating");
            }
        }
        else if(cmd[1] == "update"){
            ContactManager.toUpdate(rowNumber);
            ContactManager.deleteFlag = false;
            ContactManager.clickable("none");
        }
    },
    clickable : function(pointerEvent){
        var dIcon = document.getElementsByClassName(ContactManager.selectors.dIcon);
        for (let index = 0; index < dIcon.length; index++) {
            const element = dIcon[index];
            element.style.pointerEvents = pointerEvent;
        }
        var deleteBtn = document.getElementById(ContactManager.selectors.deleteBtn);
        deleteBtn.style.pointerEvents = pointerEvent;
    },
    deleteContact : function(rowNumber){
        if(confirm("Confirm Delete ?")){
            ContactManager.contactList.splice(rowNumber, 1);
            ContactManager.loadContacts();
        }
    },
    toUpdate : function(rowNumber){
        var jsonContacts = ContactManager.contactList;
        var _name = document.getElementById(ContactManager.selectors.name);
        _name.value = jsonContacts[rowNumber].name;
        var _phone = document.getElementById(ContactManager.selectors.phone);
        _phone.value = jsonContacts[rowNumber].phoneNumber;
        var _email = document.getElementById(ContactManager.selectors.email);
        _email.value = jsonContacts[rowNumber].email;
        var _dob = document.getElementById(ContactManager.selectors.dob);
        _dob.value = jsonContacts[rowNumber].dateOfBirth;
        var _address = document.getElementById(ContactManager.selectors.address);
        _address.value = jsonContacts[rowNumber].address;
        var stateOp = document.getElementById(ContactManager.selectors.state);
        if(jsonContacts[rowNumber].state == "Select State"){
            stateOp.selectedIndex = 0;
        }
        else{
            stateOp.value = jsonContacts[rowNumber].state;
        }
        var add_Contact = document.getElementById(ContactManager.selectors.add_Contact);
        add_Contact.style.display = "none";
        var update_Contact = document.getElementById(ContactManager.selectors.update_Contact);
        update_Contact.style.display = "block";
        var reset = document.getElementById(ContactManager.selectors.reset);
        reset.style.display = "none";
        var cancel = document.getElementById(ContactManager.selectors.cancel);
        cancel.style.display = "block";
        cancel.onclick = ContactManager.cancelUpdate;
        update_Contact.onclick = function(){
            ContactManager.updateContact(rowNumber);
        }
    },
    cancelUpdate : function(){
        ContactManager.deleteFlag = true;
        var add_Contact = document.getElementById(ContactManager.selectors.add_Contact);
        add_Contact.style.display = "block";
        var update_Contact = document.getElementById(ContactManager.selectors.update_Contact);
        update_Contact.style.display = "none";
        var reset = document.getElementById(ContactManager.selectors.reset);
        reset.style.display = "block";
        var cancel = document.getElementById(ContactManager.selectors.cancel);
        cancel.style.display = "none";
        ContactManager.resetForm();
        ContactManager.clickable("auto");
    },
    showNotification : function(message){
        var error = document.getElementById(ContactManager.selectors.error);
        error.innerHTML = message;
        error.style.display = "block";
        setTimeout(function() {
            error.innerHTML = null;
            error.style.display = "none";
        }, 5000);
    },
    updateContact : function(rowNumber){
        var _name = document.getElementById(ContactManager.selectors.name).value;
        var _phone = document.getElementById(ContactManager.selectors.phone).value;
        var _email = document.getElementById(ContactManager.selectors.email).value;
        var _dob = document.getElementById(ContactManager.selectors.dob).value;
        var isValid = ContactManager.validateInput(_name, _phone, _email, _dob);
        if(isValid){
            var _address = document.getElementById(ContactManager.selectors.address).value;
            var stateOp = document.getElementById(ContactManager.selectors.state);
            var _state = stateOp.options[stateOp.selectedIndex].text;
            var newId = ContactManager.contactList[rowNumber].id;
            ContactManager.contactList.splice(rowNumber, 1);
            var newContact = ContactManager.newObject(newId, _name, _phone, _email, _dob, _address, _state);
            ContactManager.contactList.splice(rowNumber, 0, newContact);
            ContactManager.showNotification("Contact Updated");
            ContactManager.cancelUpdate();
            ContactManager.loadContacts();
        }
        else{
            var error = document.getElementById(ContactManager.selectors.error);
            error.style.display = "block";
        }
    },
    addContact : function(){
        var _name = document.getElementById(ContactManager.selectors.name).value;
        var _phone = document.getElementById(ContactManager.selectors.phone).value;
        var _email = document.getElementById(ContactManager.selectors.email).value;
        var _dob = document.getElementById(ContactManager.selectors.dob).value;
        var isValid = ContactManager.validateInput(_name, _phone, _email, _dob);
        if(isValid){
            var _address = document.getElementById(ContactManager.selectors.address).value;
            var stateOp = document.getElementById(ContactManager.selectors.state);
            var _state = stateOp.options[stateOp.selectedIndex].text;
            var newContact = null;
            if(ContactManager.contactList.length == 0){
                newContact = ContactManager.newObject(1, _name, _phone, _email, _dob, _address, _state);
            }
            else{
                var newId = ContactManager.contactList[ContactManager.contactList.length-1].id;
                newContact = ContactManager.newObject(newId, _name, _phone, _email, _dob, _address, _state);
            }
            ContactManager.contactList.push(newContact);
            ContactManager.showNotification("Contact Added");
            ContactManager.resetForm();
            ContactManager.loadContacts();
        }
        else{
            var error = document.getElementById(ContactManager.selectors.error);
            error.style.display = "block";
        }
    },
    validateInput : function(_name, _phone, _email, _dob){
        var error = document.getElementById(ContactManager.selectors.error);
        if(_name.length == 0){
            error.innerHTML = "Name is Empty";
            return false;
        }
        else if(_phone.length == 0){
            error.innerHTML = "Phone Number is Empty";
            return false;
        }
        else if(!ContactManager.isPhoneNumber(_phone)){
            error.innerHTML = "Phone Number should have only digits";
            return false;
        }
        else if(_phone.length < 10){
            error.innerHTML = "Phone Number should be 10 digit";
            return false;
        } 
        else if(_email != "" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(_email))){
            error.innerHTML = "InValid Email ID";
            return false;
        }
        else if(_dob != "" && !ContactManager.checkDOB(_dob)){
            error.innerHTML = "DOB is Invalid";
            return false;
        }
        return true;
    },
    checkDOB : function(_dob){
        var newDate = new Date(_dob);
        var date = new Date();
        var minYear = date.getFullYear() - 100;
        var minDate = new Date(minYear + "-01-01");
        if(!(newDate <= date && newDate >= minDate)){
            return false;
        }
        return true;
    },
    isPhoneNumber : function(_phone){
        var flag = true;
        for (let index = 0; index < _phone.length; index++) {
            if((_phone[index] >= 'A' && _phone[index] <= 'Z') || (_phone[index] >= 'a' && _phone[index] <= 'z')){
                flag = false;
                break;
            }
        }
        return flag;
    },
    resetForm : function(){
        document.getElementById(ContactManager.selectors.name).value = "";
        document.getElementById(ContactManager.selectors.phone).value = "";
        document.getElementById(ContactManager.selectors.email).value = "";
        document.getElementById(ContactManager.selectors.dob).value = "";
        document.getElementById(ContactManager.selectors.address).value = "";
        var stateOp = document.getElementById(ContactManager.selectors.state);
        stateOp.selectedIndex = 0;
    },
    deleteSelected : function(){
        if(ContactManager.deleteFlag){
            var checkboxes = document.getElementsByName(ContactManager.selectors.checkboxes);
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
                    ContactManager.contactList.forEach(function(contact) {
                        if(selectedCheckboxes.includes(it)){
                            //Continue
                        }
                        else{
                            tempContacts.push(contact);
                        }
                        it ++;
                    });
                    ContactManager.contactList = tempContacts;
                    ContactManager.loadContacts();
                }
            }
        }
        else{
            alert("Can't delete while updating");
        }
    }
};
window.onload = function (){
    ContactManager.init();
};