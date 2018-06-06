var Contact = /** @class */ (function () {
    function Contact(_id, _name, _phoneNumber, _email, _dateOfBirth, _address, _state) {
        this._id = _id;
        this._name = _name;
        this._phoneNumber = _phoneNumber;
        this._email = _email;
        this._dateOfBirth = _dateOfBirth;
        this._address = _address;
        this._state = _state;
    }
    Object.defineProperty(Contact.prototype, "id", {
        //getters
        get: function () {
            return this._id;
        },
        //setters
        set: function (_id) {
            this._id = _id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (_name) {
            this._name = _name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "phoneNumber", {
        get: function () {
            return this._phoneNumber;
        },
        set: function (_phoneNumber) {
            this._phoneNumber = _phoneNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (_email) {
            this._email = _email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "dateOfBirth", {
        get: function () {
            return this._dateOfBirth;
        },
        set: function (_dateOfBirth) {
            this._dateOfBirth = _dateOfBirth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "address", {
        get: function () {
            return this._address;
        },
        set: function (_address) {
            this._address = _address;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (_state) {
            this._state = _state;
        },
        enumerable: true,
        configurable: true
    });
    return Contact;
}());
var ContactManager = /** @class */ (function () {
    function ContactManager() {
    }
    ContactManager.createStateOptions = function () {
        var state = document.getElementById(ContactManager.selectors.state);
        var options = "";
        for (var prop in ContactManager.states) {
            options += "<option value=\"" + prop + "\">" + ContactManager.states[prop] + "</option>";
        }
        state.innerHTML += options;
    };
    ContactManager.init = function () {
        // sample records
        var newContact = new Contact(1, "Santhosh", 9003435809, "gsaku0091@gmail.com", "2018-05-21", "Coimbatore", "Tamil Nadu");
        ContactManager.contactList.push(newContact);
        newContact = new Contact(2, "Kumar", 9003689126, "gsaku0092@gmail.com", "2018-04-21", "Chennai", "Tamil Nadu");
        ContactManager.contactList.push(newContact);
        //Events
        var contacts = document.getElementById(ContactManager.selectors.contacts);
        ContactManager.setMaxDate();
        ContactManager.setMinDate();
        ContactManager.createStateOptions();
        ContactManager.loadContacts();
        var deleteBtn = document.getElementById(ContactManager.selectors.deleteBtn);
        deleteBtn.onclick = ContactManager.deleteSelected;
        var selectAll = document.getElementById(ContactManager.selectors.selectAll);
        selectAll.onclick = function () {
            ContactManager.selectDeselect(true);
        };
        var unSelectAll = document.getElementById(ContactManager.selectors.unSelectAll);
        unSelectAll.onclick = function () {
            ContactManager.selectDeselect(false);
        };
        var add_Contact = document.getElementById(ContactManager.selectors.add_Contact);
        add_Contact.onclick = ContactManager.addContact;
        var reset = document.getElementById(ContactManager.selectors.reset);
        reset.onclick = ContactManager.resetForm;
        var toggle = document.getElementById(ContactManager.selectors.toggle);
        toggle.onclick = function () {
            var form = document.getElementById(ContactManager.selectors.form);
            if (form.style.display == "" || form.style.display == "block") {
                form.style.display = "none";
            }
            else {
                form.style.display = "block";
            }
            var view = document.getElementById(ContactManager.selectors.view);
            if (view.getAttribute("class") == "col-8") {
                view.setAttribute("class", "col-12");
            }
            else {
                view.setAttribute("class", "col-8");
            }
        };
    };
    ContactManager.setMinDate = function () {
        var minDate = new Date();
        var yyyy = minDate.getFullYear() - 100;
        var dd = "01";
        var mm = "01";
        var _minDate = yyyy + "-" + mm + "-" + dd;
        document.getElementById(ContactManager.selectors.dob).setAttribute("min", _minDate);
    };
    ContactManager.setMaxDate = function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        var _dd, _mm;
        if (dd < 10) {
            _dd = '0' + dd;
        }
        if (mm < 10) {
            _mm = '0' + mm;
        }
        var _today = yyyy + '-' + _mm + '-' + _dd;
        document.getElementById(ContactManager.selectors.dob).setAttribute("max", _today);
    };
    ContactManager.selectDeselect = function (status) {
        var checkboxes = document.getElementsByName(ContactManager.selectors.checkboxes);
        for (var index = 0; index < checkboxes.length; index++) {
            var element = checkboxes[index];
            element.checked = status;
        }
    };
    ContactManager.loadContacts = function () {
        var contacts = document.getElementById(ContactManager.selectors.contacts);
        var tableContent = "";
        if (ContactManager.contactList.length > 0) {
            tableContent = "<table id=\"list\" class=\"table-bordered table-hover\"><thead><tr><th>Select</th><th>Name</th><th>Mobile Number</th><th>EMail</th><th>DOB</th><th>Address</th><th>State</th><th>Actions</th></tr></thead><tbody>";
            var tempData = "";
            ContactManager.contactList.forEach(function (contact) {
                var tempState = contact.state;
                if (tempState == "Select State") {
                    tempState = "";
                }
                tempData += "<tr>" + "<td><input type=\"checkbox\" name=\"select-contact\" value=\"" + contact.id + "\" ></td>" + "<td>" + contact.name + "</td>" + "<td>" + contact.phoneNumber + "</td>" + "<td>" + contact.email + "</td>" + "<td>" + contact.dateOfBirth + "</td>" + "<td>" + contact.address + "</td>" + "<td>" + tempState + "</td>" + "<td><img src=\"delete.png\" alt=\"delete contact\" height=\"25\" width=\"25\" onclick=\"ContactManager.deleteUpdateUtil(this.id)\" id=\"" + contact.id + "-delete\" class=\"delete-icon\" title=\"delete contact\" ><img src=\"edit.svg\" alt=\"Update contact\" height=\"25\" width=\"25\" style=\"margin-left:10px;\" onclick=\"ContactManager.deleteUpdateUtil(this.id)\" id=\"" + contact.id + "-update\" class=\"update-icon\" title=\"edit contact\" ></td>" + "</tr>";
            });
            tableContent += tempData;
            tableContent += "</tbody></table>";
        }
        else {
            tableContent = "<table id=\"list\" class=\"table-bordered table-hover\"><thead><tr><th>Select</th><th>Name</th><th>Mobile Number</th><th>EMail</th><th>DOB</th><th>Address</th><th>State</th><th>Actions</th></tr></thead></table>";
        }
        contacts.innerHTML = tableContent;
    };
    ContactManager.deleteUpdateUtil = function (clickedImg) {
        var rowNumber = parseInt(clickedImg);
        var selectedRecord;
        for (selectedRecord = 0; selectedRecord < ContactManager.contactList.length; selectedRecord++) {
            var contact = ContactManager.contactList[selectedRecord];
            if (contact.id == rowNumber) {
                break;
            }
        }
        ContactManager.currentRecord = selectedRecord;
        console.log(ContactManager.currentRecord);
        var cmd = clickedImg.split('-');
        if (cmd[1] == "delete") {
            if (ContactManager.deleteFlag) {
                ContactManager.deleteContact();
            }
            else {
                alert("Can't delete while updating");
            }
        }
        else if (cmd[1] == "update") {
            document.getElementById(ContactManager.selectors.form).style.display = "block";
            ContactManager.toUpdate();
            ContactManager.deleteFlag = false;
            ContactManager.clickable("none", "add");
        }
    };
    ContactManager.clickable = function (pointerEvent, attr) {
        var dIcon = document.getElementsByClassName(ContactManager.selectors.dIcon);
        for (var index = 0; index < dIcon.length; index++) {
            var element = dIcon[index];
            element.style.pointerEvents = pointerEvent;
        }
        var del = document.getElementById(ContactManager.selectors.deleteBtn);
        if (attr == "add") {
            del.setAttribute("disabled", "disabled");
        }
        else {
            del.removeAttribute("disabled"); //
        }
    };
    ContactManager.deleteContact = function () {
        if (confirm("Confirm Delete ?")) {
            ContactManager.contactList.splice(ContactManager.currentRecord, 1);
            ContactManager.loadContacts();
            ContactManager.showNotification("Contact Deleted..!");
        }
    };
    ContactManager.toUpdate = function () {
        var jsonContacts = ContactManager.contactList;
        var _name = document.getElementById(ContactManager.selectors.name);
        _name.value = jsonContacts[ContactManager.currentRecord].name;
        var _phone = document.getElementById(ContactManager.selectors.phone);
        _phone.value = jsonContacts[ContactManager.currentRecord].phoneNumber;
        var _email = document.getElementById(ContactManager.selectors.email);
        _email.value = jsonContacts[ContactManager.currentRecord].email;
        var _dob = document.getElementById(ContactManager.selectors.dob);
        _dob.value = jsonContacts[ContactManager.currentRecord].dateOfBirth;
        var _address = document.getElementById(ContactManager.selectors.address);
        _address.value = jsonContacts[ContactManager.currentRecord].address;
        var stateOp = document.getElementById(ContactManager.selectors.state);
        if (jsonContacts[ContactManager.currentRecord].state == "Select State") {
            stateOp.selectedIndex = 0;
        }
        else {
            stateOp.value = jsonContacts[ContactManager.currentRecord].state;
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
        update_Contact.onclick = ContactManager.updateContact;
    };
    ContactManager.cancelUpdate = function () {
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
        ContactManager.clickable("auto", "remove");
    };
    ContactManager.showNotification = function (message) {
        var error = document.getElementById(ContactManager.selectors.error);
        var error_msg = document.getElementById(ContactManager.selectors.error_msg);
        error_msg.innerHTML = message;
        error.style.display = "block";
        error.className += " alert alert-success alert-dismissible";
        setTimeout(function () {
            error.style.display = "none";
            error.classList.remove("alert alert-success alert-dismissible");
        }, 5000);
        var close = document.getElementsByClassName(ContactManager.selectors.close);
        for (var index = 0; index < close.length; index++) {
            var element = close[index];
            element.onclick = function () {
                error.style.display = "none";
                error.classList.remove("alert alert-success alert-dismissible");
            };
        }
    };
    ContactManager.updateContact = function () {
        var _name = document.getElementById(ContactManager.selectors.name).value;
        var _phone = document.getElementById(ContactManager.selectors.phone).value;
        var _email = document.getElementById(ContactManager.selectors.email).value;
        var _dob = document.getElementById(ContactManager.selectors.dob).value;
        var isValid = ContactManager.validateInput(_name, _phone, _email, _dob);
        if (isValid) {
            var _address = document.getElementById(ContactManager.selectors.address).value;
            var _state = document.getElementById(ContactManager.selectors.state).value;
            var newId = ContactManager.contactList[ContactManager.currentRecord].id;
            var newContact = new Contact(newId, _name, _phone, _email, _dob, _address, _state);
            ContactManager.contactList.splice(ContactManager.currentRecord, 1, newContact);
            ContactManager.showNotification("Contact Updated");
            ContactManager.cancelUpdate();
            ContactManager.loadContacts();
        }
        else {
            var error = document.getElementById(ContactManager.selectors.error);
            error.style.display = "block";
            error.className += " alert alert-danger alert-dismissible";
            var close = document.getElementsByClassName(ContactManager.selectors.close);
            for (var index = 0; index < close.length; index++) {
                var element = close[index];
                element.onclick = function () {
                    error.style.display = "none";
                    error.classList.remove("alert alert-danger alert-dismissible");
                };
            }
        }
    };
    ContactManager.addContact = function () {
        var _name = document.getElementById(ContactManager.selectors.name).value;
        var _phone = document.getElementById(ContactManager.selectors.phone).value;
        var _email = document.getElementById(ContactManager.selectors.email).value;
        var _dob = document.getElementById(ContactManager.selectors.dob).value;
        var isValid = ContactManager.validateInput(_name, _phone, _email, _dob);
        if (isValid) {
            var _address = document.getElementById(ContactManager.selectors.address).value;
            var _state = document.getElementById(ContactManager.selectors.state).value;
            var newContact = null;
            if (ContactManager.contactList.length == 0) {
                newContact = new Contact(1, _name, _phone, _email, _dob, _address, _state);
            }
            else {
                var newId = ContactManager.contactList[ContactManager.contactList.length - 1].id + 1;
                newContact = new Contact(newId, _name, _phone, _email, _dob, _address, _state);
            }
            ContactManager.contactList.push(newContact);
            ContactManager.showNotification("Contact Added");
            ContactManager.resetForm();
            ContactManager.loadContacts();
        }
        else {
            var error = document.getElementById(ContactManager.selectors.error);
            error.style.display = "block";
            error.className += " alert alert-danger alert-dismissible";
            var close = document.getElementsByClassName(ContactManager.selectors.close);
            for (var index = 0; index < close.length; index++) {
                var element = close[index];
                element.onclick = function () {
                    error.style.display = "none";
                    error.classList.remove("alert alert-danger alert-dismissible");
                };
            }
        }
    };
    ContactManager.validateInput = function (_name, _phone, _email, _dob) {
        var error_msg = document.getElementById(ContactManager.selectors.error_msg);
        if (_name.length == 0) {
            error_msg.innerHTML = "Name is Empty";
            document.getElementById(ContactManager.selectors.name).focus();
            return false;
        }
        else if (_phone.length == 0) {
            error_msg.innerHTML = "Phone Number is Empty";
            document.getElementById(ContactManager.selectors.phone).focus();
            return false;
        }
        else if (!ContactManager.isPhoneNumber(_phone)) {
            error_msg.innerHTML = "Phone Number should have only digits";
            document.getElementById(ContactManager.selectors.phone).focus();
            return false;
        }
        else if (_phone.length < 10) {
            error_msg.innerHTML = "Phone Number should be 10 digit";
            document.getElementById(ContactManager.selectors.phone).focus();
            return false;
        }
        else if (_email != "" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(_email))) {
            error_msg.innerHTML = "InValid Email ID";
            document.getElementById(ContactManager.selectors.email).focus();
            return false;
        }
        else if (_dob != "" && !ContactManager.checkDOB(_dob)) {
            error_msg.innerHTML = "DOB is Invalid";
            document.getElementById(ContactManager.selectors.dob).focus();
            return false;
        }
        return true;
    };
    ContactManager.checkDOB = function (_dob) {
        var newDate = new Date(_dob);
        var date = new Date();
        var minYear = date.getFullYear() - 100;
        var minDate = new Date(minYear + "-01-01");
        if (!(newDate <= date && newDate >= minDate)) {
            return false;
        }
        return true;
    };
    ContactManager.isPhoneNumber = function (_phone) {
        var flag = true;
        for (var index = 0; index < _phone.length; index++) {
            if ((_phone[index] >= 'A' && _phone[index] <= 'Z') || (_phone[index] >= 'a' && _phone[index] <= 'z')) {
                flag = false;
                break;
            }
        }
        return flag;
    };
    ContactManager.resetForm = function () {
        document.getElementById(ContactManager.selectors.name).value = "";
        document.getElementById(ContactManager.selectors.phone).value = "";
        document.getElementById(ContactManager.selectors.email).value = "";
        document.getElementById(ContactManager.selectors.dob).value = "";
        document.getElementById(ContactManager.selectors.address).value = "";
        var stateOp = document.getElementById(ContactManager.selectors.state);
        stateOp.selectedIndex = 0;
    };
    ContactManager.deleteSelected = function () {
        if (ContactManager.deleteFlag) {
            var checkboxes = document.getElementsByName(ContactManager.selectors.checkboxes);
            var selectedCheckboxes = [];
            for (var index = 0; index < checkboxes.length; index++) {
                var element = checkboxes[index];
                if (element.checked) {
                    selectedCheckboxes.push(parseInt(element.value));
                }
            }
            if (selectedCheckboxes.length == 0) {
                alert("Select any one record to proceed..!");
            }
            else {
                if (confirm("Confirm Delete ?")) {
                    var tempContacts = [];
                    console.log(selectedCheckboxes);
                    ContactManager.contactList.forEach(function (contact) {
                        if (selectedCheckboxes.indexOf(contact.id) == -1) {
                            tempContacts.push(contact);
                        }
                    });
                    ContactManager.contactList = tempContacts;
                    ContactManager.loadContacts();
                    ContactManager.showNotification("Contact's Deleted..!");
                }
            }
        }
        else {
            alert("Can't delete while updating");
        }
    };
    ContactManager.contactList = [];
    ContactManager.deleteFlag = true;
    ContactManager.currentRecord = -1;
    ContactManager.selectors = {
        contacts: "contacts-list",
        deleteBtn: "Delete",
        selectAll: "Select-All",
        unSelectAll: "UnSelect-All",
        add_Contact: "Add-Contact",
        reset: "Reset",
        checkboxes: "select-contact",
        dob: "dob",
        dIcon: "delete-icon",
        name: "name",
        phone: "phone",
        email: "email",
        address: "address",
        state: "state",
        update_Contact: "Update-Contact",
        cancel: "Cancel",
        error: "Notification",
        error_msg: "Msg",
        toggle: "toggle-form",
        form: "create-update-form",
        view: "view-point",
        close: "close"
    };
    ContactManager.states = {
        "Andhra Pradesh": "Andhra Pradesh",
        "Arunachal Pradesh": "Arunachal Pradesh",
        "Assam": "Assam",
        "Bihar": "Bihar",
        "Chhattisgarh": "Chhattisgarh",
        "Goa": "Goa",
        "Gujarat": "Gujarat",
        "Haryana": "Haryana",
        "Himachal Pradesh": "Himachal Pradesh",
        "Jammu & Kashmir": "Jammu & Kashmir",
        "Jharkhand": "Jharkhand",
        "Karnataka": "Karnataka",
        "Kerala": "Kerala",
        "Madhya Pradesh": "Madhya Pradesh",
        "Maharashtra": "Maharashtra",
        "Manipur": "Manipur",
        "Meghalaya": "Meghalaya",
        "Mizoram": "Mizoram",
        "Nagaland": "Nagaland",
        "Odisha": "Odisha",
        "Punjab": "Punjab",
        "Rajasthan": "Rajasthan",
        "Sikkim": "Sikkim",
        "Tamil Nadu": "Tamil Nadu",
        "Telangana": "Telangana",
        "Tripura": "Tripura",
        "Uttarakhand": "Uttarakhand",
        "Uttar Pradesh": "Uttar Pradesh",
        "West Bengal": "West Bengal",
        "Andaman and Nicobar Islands": "Andaman and Nicobar Islands",
        "Chandigarh": "Chandigarh",
        "Dadra and Nagar Haveli": "Dadra and Nagar Haveli",
        "Daman & Diu": "Daman & Diu",
        "Delhi": "Delhi",
        "Lakshadweep": "Lakshadweep",
        "Puducherry": "Puducherry",
    };
    return ContactManager;
}());
window.onload = function () {
    ContactManager.init();
};
