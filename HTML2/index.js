var ContactManager = {
    contactList : [],
    deleteFlag : true,
    currentRecord : -1,
    selectors : {
        contacts : "#contacts-list",
        deleteBtn : "#Delete",
        selectAll : "#Select-All",
        unSelectAll : "#UnSelect-All",
        add_Contact : "#Add-Contact",
        reset : "#Reset",
        checkboxes : "[name=select-contact]",
        dob : "#dob",
        dIcon : ".delete-icon",
        name : "#name",
        phone : "#phone",
        email : "#email",
        address : "#address",
        state : "#state",
        update_Contact : "#Update-Contact",
        cancel : "#Cancel",
        error : "#Error-Msg"
    },
    states : {
        "Andhra Pradesh" : "Andhra Pradesh",
        "Arunachal Pradesh" : "Arunachal Pradesh",
        "Assam" : "Assam",
        "Bihar" : "Bihar",
        "Chhattisgarh" : "Chhattisgarh",
        "Goa" : "Goa",
        "Gujarat" : "Gujarat",
        "Haryana" : "Haryana",
        "Himachal Pradesh" : "Himachal Pradesh",
        "Jammu & Kashmir" : "Jammu & Kashmir",
        "Jharkhand" : "Jharkhand",
        "Karnataka" : "Karnataka",
        "Kerala" : "Kerala",
        "Madhya Pradesh" : "Madhya Pradesh",
        "Maharashtra" : "Maharashtra",
        "Manipur" : "Manipur",
        "Meghalaya" : "Meghalaya",
        "Mizoram" : "Mizoram",
        "Nagaland" : "Nagaland",
        "Odisha" : "Odisha",
        "Punjab" : "Punjab",
        "Rajasthan" : "Rajasthan",
        "Sikkim" : "Sikkim",
        "Tamil Nadu" : "Tamil Nadu",
        "Telangana" : "Telangana",
        "Tripura" : "Tripura",
        "Uttarakhand" : "Uttarakhand",
        "Uttar Pradesh" : "Uttar Pradesh",
        "West Bengal" : "West Bengal",
        "Andaman and Nicobar Islands" : "Andaman and Nicobar Islands",
        "Chandigarh" : "Chandigarh",
        "Dadra and Nagar Haveli" : "Dadra and Nagar Haveli",
        "Daman & Diu" : "Daman & Diu",
        "Delhi" : "Delhi",
        "Lakshadweep" : "Lakshadweep",
        "Puducherry" : "Puducherry",
    },
    createStateOptions : function(){
        var $state = $(ContactManager.selectors.state);
        for (let prop in ContactManager.states) {
            $state.append( $("<option>").val(prop).html(ContactManager.states[prop]));
        }
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
        // sample records
        var newContact = ContactManager.newObject(1, "Santhosh", 9003435809, "gsaku0091@gmail.com", "2018-05-21", "Coimbatore", "Tamil Nadu");
        ContactManager.contactList.push(newContact);
        newContact = ContactManager.newObject(2, "Kumar", 9003689126, "gsaku0092@gmail.com", "2018-04-21", "Chennai", "Tamil Nadu");
        ContactManager.contactList.push(newContact);
        //Events
        $contacts = $(ContactManager.selectors.contacts);
        ContactManager.setMaxDate();
        ContactManager.setMinDate();
        ContactManager.createStateOptions();
        ContactManager.loadContacts();
        var $deleteBtn = $(ContactManager.selectors.deleteBtn);
        $deleteBtn.click(ContactManager.deleteSelected);
        var $selectAll = $(ContactManager.selectors.selectAll);
        $selectAll.click(function(){
            ContactManager.selectDeselect(true);
        });
        var $unSelectAll = $(ContactManager.selectors.unSelectAll);
        $unSelectAll.click(function(){
            ContactManager.selectDeselect(false);
        });
        var $add_Contact = $(ContactManager.selectors.add_Contact);
        $add_Contact.click(ContactManager.addContact);
        var $reset = $(ContactManager.selectors.reset);
        $reset.click(ContactManager.resetForm);
    },
    setMinDate : function(){
        var minDate = new Date();
        var yyyy = minDate.getFullYear() - 100;
        var dd = "01";
        var mm = "01";
        minDate = yyyy + "-" + mm + "-" + dd;
        $(ContactManager.selectors.dob).attr("min", minDate);
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
        $(ContactManager.selectors.dob).attr("max", today);
    },
    selectDeselect : function(status){
        var $checkboxes = $(ContactManager.selectors.checkboxes);
        for (let index = 0; index < $checkboxes.length; index++) {
            var $element = $checkboxes[index];
            $element.checked = status;
        }
    },
    loadContacts : function(){
        if(ContactManager.contactList.length > 0){
            var tableContent = "<table id=\"list\" border=\"1\"><thead><tr><th>Select</th><th>Name</th><th>Mobile Number</th><th>EMail</th><th>DOB</th><th>Address</th><th>State</th><th>Actions</th></tr></thead><tbody>";
            var tempData = "";
            var chkboc_value = 0;
            ContactManager.contactList.forEach(function(contact) {
                var tempState = contact.state;
                if(tempState == "Select State"){
                    tempState = "";
                }
                tempData += "<tr>" + "<td><input type=\"checkbox\" name=\"select-contact\" value=\"" + chkboc_value + "\" ></td>" + "<td>" + contact.name + "</td>" + "<td>" + contact.phoneNumber + "</td>" + "<td>" + contact.email + "</td>" + "<td>" + contact.dateOfBirth + "</td>" + "<td>" + contact.address + "</td>" + "<td>" + tempState + "</td>" + "<td><img src=\"delete.png\" alt=\"delete contact\" height=\"25\" width=\"25\" onclick=\"ContactManager.deleteUpdateUtil(this.id)\" id=\"" + chkboc_value + "-delete\" class=\"delete-icon\" title=\"delete contact\" ><img src=\"edit.svg\" alt=\"Update contact\" height=\"25\" width=\"25\" style=\"margin-left:10px;\" onclick=\"ContactManager.deleteUpdateUtil(this.id)\" id=\"" + chkboc_value + "-update\" class=\"update-icon\" title=\"edit contact\" ></td>" + "</tr>";
                chkboc_value ++;
            });
            tableContent += tempData;
            tableContent += "</tbody></table>";
            $contacts.html(tableContent);
        }
        else{
            $contacts.text("Empty");
        }
    },
    deleteUpdateUtil : function(clickedImg){
        var rowNumber = parseInt(clickedImg);
        ContactManager.currentRecord = rowNumber;
        var cmd = clickedImg.split('-');
        if(cmd[1] == "delete"){
            if(ContactManager.deleteFlag){
                ContactManager.deleteContact();
            }
            else{
                alert("Can't delete while updating");
            }
        }
        else if(cmd[1] == "update"){
            ContactManager.toUpdate();
            ContactManager.deleteFlag = false;
            ContactManager.clickable("none");
        }
    },
    clickable : function(pointerEvent){
        var $dIcon = $(ContactManager.selectors.dIcon);
        $dIcon.css("pointerEvents", pointerEvent);
        var $del = $(ContactManager.selectors.deleteBtn);
        $del.css("pointerEvents", pointerEvent);
    },
    deleteContact : function(){
        if(confirm("Confirm Delete ?")){
            ContactManager.contactList.splice(ContactManager.currentRecord, 1);
            ContactManager.loadContacts();
        }
    },
    toUpdate : function(){
        var jsonContacts = ContactManager.contactList;
        var $_name = $(ContactManager.selectors.name);
        $_name.val(jsonContacts[ContactManager.currentRecord].name);
        var $_phone = $(ContactManager.selectors.phone);
        $_phone.val(jsonContacts[ContactManager.currentRecord].phoneNumber);
        var $_email = $(ContactManager.selectors.email);
        $_email.val(jsonContacts[ContactManager.currentRecord].email);
        var $_dob = $(ContactManager.selectors.dob);
        $_dob.val(jsonContacts[ContactManager.currentRecord].dateOfBirth);
        var $_address = $(ContactManager.selectors.address);
        $_address.val(jsonContacts[ContactManager.currentRecord].address);
        var $stateOp = $(ContactManager.selectors.state);
        if(jsonContacts[ContactManager.currentRecord].state == "Select State"){
            $stateOp.prop('selectedIndex', 0);
        }
        else{
            $stateOp.val(jsonContacts[ContactManager.currentRecord].state);
        }
        var $add_Contact = $(ContactManager.selectors.add_Contact);
        $add_Contact.hide();
        var $update_Contact = $(ContactManager.selectors.update_Contact);
        $update_Contact.show();
        var $reset = $(ContactManager.selectors.reset);
        $reset.hide();
        var $cancel = $(ContactManager.selectors.cancel);
        $cancel.show();
        $cancel.click(function(){
            ContactManager.cancelUpdate();
        });
        $update_Contact.click(function(){
            ContactManager.updateContact();
        });
    },
    cancelUpdate : function(){
        ContactManager.deleteFlag = true;
        var $add_Contact = $(ContactManager.selectors.add_Contact);
        $add_Contact.show();
        var $update_Contact = $(ContactManager.selectors.update_Contact);
        $update_Contact.hide();
        var $reset = $(ContactManager.selectors.reset);
        $reset.show();
        var $cancel = $(ContactManager.selectors.cancel);
        $cancel.hide();
        ContactManager.resetForm();
        ContactManager.clickable("auto");
    },
    showNotification : function(message){
        var $error = $(ContactManager.selectors.error);
        $error.html(message);
        $error.show();
        setTimeout(function() {
            $error.empty();
            $error.hide();
        }, 5000);
    },
    updateContact : function(){
        var _name = $(ContactManager.selectors.name).val();
        var _phone = $(ContactManager.selectors.phone).val();
        var _email = $(ContactManager.selectors.email).val();
        var _dob = $(ContactManager.selectors.dob).val();
        var isValid = ContactManager.validateInput(_name, _phone, _email, _dob);
        if(isValid){
            var _address = $(ContactManager.selectors.address).val();
            var _state = $(ContactManager.selectors.state).val();
            var newId = ContactManager.contactList[ContactManager.currentRecord].id;
            var newContact = ContactManager.newObject(newId, _name, _phone, _email, _dob, _address, _state);
            ContactManager.contactList.splice(ContactManager.currentRecord, 1, newContact);
            ContactManager.showNotification("Contact Updated");
            ContactManager.cancelUpdate();
            ContactManager.loadContacts();
        }
        else{
            var $error = $(ContactManager.selectors.error);
            $error.show();
        }
    },
    addContact : function(){
        var _name = $(ContactManager.selectors.name).val();
        var _phone = $(ContactManager.selectors.phone).val();
        var _email = $(ContactManager.selectors.email).val();
        var _dob = $(ContactManager.selectors.dob).val();
        var isValid = ContactManager.validateInput(_name, _phone, _email, _dob);
        if(isValid){
            var _address = $(ContactManager.selectors.address).val();
            var _state = $(ContactManager.selectors.state).val();
            var newContact = null;
            if(ContactManager.contactList.length == 0){
                newContact = ContactManager.newObject(1, _name, _phone, _email, _dob, _address, _state);
            }
            else{
                var newId = ContactManager.contactList[ContactManager.contactList.length-1].id+1;
                newContact = ContactManager.newObject(newId, _name, _phone, _email, _dob, _address, _state);
            }
            ContactManager.contactList.push(newContact);
            ContactManager.showNotification("Contact Added");
            ContactManager.resetForm();
            ContactManager.loadContacts();
        }
        else{
            var $error = $("#Error-Msg");
            $error.show();
        }
    },
    validateInput : function(_name, _phone, _email, _dob){
        var $error = $(ContactManager.selectors.error);
        if(_name.length == 0){
            $error.html("Name is Empty");
            return false;
        }
        else if(_phone.length == 0){
            $error.html("Phone Number is Empty");
            return false;
        }
        else if(!ContactManager.isPhoneNumber(_phone)){
            $error.html("Phone Number should have only digits");
            return false;
        }
        else if(_phone.length < 10){
            $error.html("Phone Number should be 10 digit");
            return false;
        } 
        else if(_email != "" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(_email))){
            $error.html("InValid Email ID");
            return false;
        }
        else if(_dob != "" && !ContactManager.checkDOB(_dob)){
            $error.html("DOB is Invalid");
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
        $(ContactManager.selectors.name).val("");
        $(ContactManager.selectors.phone).val("");
        $(ContactManager.selectors.email).val("");
        $(ContactManager.selectors.dob).val("");
        $(ContactManager.selectors.address).val("");
        var $stateOp = $(ContactManager.selectors.state);
        $stateOp.prop('selectedIndex', 0);
    },
    deleteSelected : function(){
        if(ContactManager.deleteFlag){
            var $checkboxes = $("[name=select-contact]");
            var selectedCheckboxes = [];
            for (let index = 0; index < $checkboxes.length; index++) {
                var $element = $checkboxes[index];
                if($element.checked){
                    selectedCheckboxes.push(parseInt($element.value));
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
                        if(!selectedCheckboxes.includes(it)){
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
$(function(){
    ContactManager.init();
});