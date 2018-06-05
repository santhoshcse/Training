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
        var _today = yyyy + '-' + mm + '-' + dd;
        // $(ContactManager.selectors.dob).attr("max", _today);
    };
    ContactManager.setMinDate = function () {
        var minDate = new Date();
        var yyyy = minDate.getFullYear() - 100;
        var dd = "01";
        var mm = "01";
        var _minDate = yyyy + "-" + mm + "-" + dd;
        // $(ContactManager.selectors.dob).attr("min", _minDate);
    };
    ContactManager.createStateOptions = function () {
        var state = document.getElementById(ContactManager.selectors.state);
        for (var prop in ContactManager.states) {
            // state.append( $("<option>").val(prop).html(ContactManager.states[prop]));
        }
    };
    ContactManager.loadContacts = function () {
        var contacts = document.getElementById(ContactManager.selectors.contacts);
        if (ContactManager.contactList.length > 0) {
            var tableContent = "<table id=\"list\" class=\"table-bordered table-hover\"><thead><tr><th>Select</th><th>Name</th><th>Mobile Number</th><th>EMail</th><th>DOB</th><th>Address</th><th>State</th><th>Actions</th></tr></thead><tbody>";
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
            contacts.innerHTML = tableContent;
            console.log(ContactManager.contactList);
        }
        else {
            tableContent = "<table id=\"list\" class=\"table-bordered table-hover\"><thead><tr><th>Select</th><th>Name</th><th>Mobile Number</th><th>EMail</th><th>DOB</th><th>Address</th><th>State</th><th>Actions</th></tr></thead></table>";
            contacts.innerHTML = tableContent;
        }
    };
    ContactManager.selectDeselect = function (status) {
        var checkboxes = document.getElementsByName(ContactManager.selectors.checkboxes);
        for (var index = 0; index < checkboxes.length; index++) {
            var element = checkboxes[index];
            // element.checked = status;
        }
    };
    ContactManager.deleteSelected = function () {
    };
    ContactManager.addContact = function () {
    };
    ContactManager.resetForm = function () {
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
        var $unSelectAll = document.getElementById(ContactManager.selectors.unSelectAll);
        $unSelectAll.onclick = function () {
            ContactManager.selectDeselect(false);
        };
        var add_Contact = document.getElementById(ContactManager.selectors.add_Contact);
        add_Contact.onclick = ContactManager.addContact;
        var reset = document.getElementById(ContactManager.selectors.reset);
        reset.onclick = ContactManager.resetForm;
        var toggle = document.getElementById(ContactManager.selectors.toggle);
        toggle.onclick = function () {
            // $(ContactManager.selectors.form).toggle();
            var view = document.getElementById(ContactManager.selectors.view);
            // if($view.attr("class") == "col-8"){
            // $view.attr("class", "col-12");
            // }
            // else{
            // $view.attr("class", "col-8");
            // }
        };
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
        checkboxes: "[name=select-contact]",
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
        view: "view-point"
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
