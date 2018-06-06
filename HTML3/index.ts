class Contact {
    _id : any;
    _name : any;
    _phoneNumber : any;
    _email : any;
    _dateOfBirth : any;
    _address : any;
    _state : any;
    constructor(_id : any, _name : any, _phoneNumber : any, _email : any, _dateOfBirth : any, _address : any, _state : any) {
        this._id = _id;
        this._name = _name;
        this._phoneNumber = _phoneNumber;
        this._email = _email;
        this._dateOfBirth = _dateOfBirth;
        this._address = _address;
        this._state = _state;
    }
    //getters
    get id() : any {
        return this._id;
    }
    get name() : any {
        return this._name;
    }
    get phoneNumber() : any {
        return this._phoneNumber;
    }
    get email() : any {
        return this._email;
    }
    get dateOfBirth() : any {
        return this._dateOfBirth;
    }
    get address() : any {
        return this._address;
    }
    get state() : any {
        return this._state;
    }
    //setters
    set id(_id : any) {
        this._id = _id;
    }
    set name(_name : any) {
        this._name = _name;
    }
    set phoneNumber(_phoneNumber : any) {
        this._phoneNumber = _phoneNumber;
    }
    set email(_email : any) {
        this._email = _email;
    }
    set dateOfBirth(_dateOfBirth : any) {
        this._dateOfBirth = _dateOfBirth;
    }
    set address(_address : any) {
        this._address = _address;
    }
    set state(_state : any) {
        this._state = _state;
    }
}
class ContactManager {
    private static contactList : Contact[] = [];
    private static deleteFlag : boolean = true;
    private static currentRecord : number = -1;
    private static selectors : any = {
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
        error : "Notification",
        error_msg : "Msg",
        toggle : "toggle-form",
        form : "create-update-form",
        view : "view-point",
        close : "close"
    };
    private static states : any = {
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
    };
    private static createStateOptions() : void {
        var state = document.getElementById(ContactManager.selectors.state);
        for (let prop in ContactManager.states) {
            // state.append( $("<option>").val(prop).html(ContactManager.states[prop]));
        }
    }
    static init() : void {
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
        var toggle = document.getElementById(ContactManager.selectors.toggle);
        toggle.onclick = function(){
            var form = document.getElementById(ContactManager.selectors.form);
            if(form.style.display == "" || form.style.display == "block"){
                form.style.display = "none";
            }
            else{
                form.style.display = "block";
            }
            var view = document.getElementById(ContactManager.selectors.view);
            // if(view.attr("class") == "col-8"){
                // view.attr("class", "col-12");
            // }
            // else{
                // view.attr("class", "col-8");
            // }
        };
    }
    private static setMinDate() : void {
        var minDate = new Date();
        var yyyy = minDate.getFullYear() - 100;
        var dd = "01";
        var mm = "01";
        var _minDate = yyyy + "-" + mm + "-" + dd;
        // $(ContactManager.selectors.dob).attr("min", _minDate);
    }
    private static setMaxDate() : void {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var _dd, _mm;
        if(dd<10){
            _dd = '0' + dd;
        }
        if(mm<10){
            _mm = '0' + mm;
        }
        var _today = yyyy + '-' + mm + '-' + dd;
        // $(ContactManager.selectors.dob).attr("max", _today);
    }
    private static selectDeselect(status : boolean) : void {
        var checkboxes = document.getElementsByName(ContactManager.selectors.checkboxes);
        for (let index = 0; index < checkboxes.length; index++) {
            var element = <HTMLInputElement>checkboxes[index];
            element.checked = status;
        }
    }
    private static loadContacts() : void {
        var contacts = document.getElementById(ContactManager.selectors.contacts);
        if(ContactManager.contactList.length > 0){
            var tableContent = "<table id=\"list\" class=\"table-bordered table-hover\"><thead><tr><th>Select</th><th>Name</th><th>Mobile Number</th><th>EMail</th><th>DOB</th><th>Address</th><th>State</th><th>Actions</th></tr></thead><tbody>";
            var tempData = "";
            ContactManager.contactList.forEach(function(contact) {
                var tempState = contact.state;
                if(tempState == "Select State"){
                    tempState = "";
                }
                tempData += "<tr>" + "<td><input type=\"checkbox\" name=\"select-contact\" value=\"" + contact.id + "\" ></td>" + "<td>" + contact.name + "</td>" + "<td>" + contact.phoneNumber + "</td>" + "<td>" + contact.email + "</td>" + "<td>" + contact.dateOfBirth + "</td>" + "<td>" + contact.address + "</td>" + "<td>" + tempState + "</td>" + "<td><img src=\"delete.png\" alt=\"delete contact\" height=\"25\" width=\"25\" onclick=\"ContactManager.deleteUpdateUtil(this.id)\" id=\"" + contact.id + "-delete\" class=\"delete-icon\" title=\"delete contact\" ><img src=\"edit.svg\" alt=\"Update contact\" height=\"25\" width=\"25\" style=\"margin-left:10px;\" onclick=\"ContactManager.deleteUpdateUtil(this.id)\" id=\"" + contact.id + "-update\" class=\"update-icon\" title=\"edit contact\" ></td>" + "</tr>";
            });
            tableContent += tempData;
            tableContent += "</tbody></table>";
            contacts.innerHTML = tableContent;
            // console.log(ContactManager.contactList);
        }
        else{
            tableContent = "<table id=\"list\" class=\"table-bordered table-hover\"><thead><tr><th>Select</th><th>Name</th><th>Mobile Number</th><th>EMail</th><th>DOB</th><th>Address</th><th>State</th><th>Actions</th></tr></thead></table>";
            contacts.innerHTML = tableContent;
        }
    }
    private static deleteUpdateUtil(clickedImg : string) : void {
        var rowNumber = parseInt(clickedImg);
        let selectedRecord;
        for(selectedRecord = 0; selectedRecord < ContactManager.contactList.length; selectedRecord++){
            var contact = ContactManager.contactList[selectedRecord];
            if(contact.id == rowNumber){
                break;
            }
        }
        ContactManager.currentRecord = selectedRecord;
        console.log(ContactManager.currentRecord);
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
            document.getElementById(ContactManager.selectors.form).style.display = "block";
            ContactManager.toUpdate();
            ContactManager.deleteFlag = false;
            ContactManager.clickable("none", "disabled", "active", "add");
        }
    }
    private static clickable(pointerEvent : string, add : string, remove : string, attr : string) : void {
        var dIcon = document.getElementsByClassName(ContactManager.selectors.dIcon);
        // dIcon.css("pointerEvents", pointerEvent);
        var del = document.getElementById(ContactManager.selectors.deleteBtn);
        // del.addClass(add);
        // del.removeClass(remove);
        if(attr == "add"){
            // del.attr("disabled", "disabled");
        }
        else{
            // del.removeAttr("disabled", "disabled");
        }
        // del.css("pointerEvents", pointerEvent);
    }
    private static deleteContact() : void {
        if(confirm("Confirm Delete ?")){
            ContactManager.contactList.splice(ContactManager.currentRecord, 1);
            ContactManager.loadContacts();
            ContactManager.showNotification("Contact Deleted..!");
        }
    }
    private static toUpdate() : void {
        var jsonContacts = ContactManager.contactList;
        var _name = <HTMLInputElement>document.getElementById(ContactManager.selectors.name);
        _name.value = jsonContacts[ContactManager.currentRecord].name;
        var _phone = <HTMLInputElement>document.getElementById(ContactManager.selectors.phone);
        _phone.value = jsonContacts[ContactManager.currentRecord].phoneNumber;
        var _email = <HTMLInputElement>document.getElementById(ContactManager.selectors.email);
        _email.value = jsonContacts[ContactManager.currentRecord].email;
        var _dob = <HTMLInputElement>document.getElementById(ContactManager.selectors.dob);
        _dob.value = jsonContacts[ContactManager.currentRecord].dateOfBirth;
        var _address = <HTMLInputElement>document.getElementById(ContactManager.selectors.address);
        _address.value = jsonContacts[ContactManager.currentRecord].address;
        var stateOp = <HTMLSelectElement>document.getElementById(ContactManager.selectors.state);
        if(jsonContacts[ContactManager.currentRecord].state == "Select State"){
            stateOp.selectedIndex = 0;
        }
        else{
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
    }
    private static cancelUpdate() : void {
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
        ContactManager.clickable("auto", "active", "disabled", "remove");
    }
    private static showNotification(message : string) : void {
        var error = document.getElementById(ContactManager.selectors.error);
        var error_msg = document.getElementById(ContactManager.selectors.error_msg);
        error_msg.innerHTML = message;
        error.style.display = "block";
        // error.addClass("alert alert-success alert-dismissible");
        setTimeout(function() {
            error.style.display = "none";
            // error.removeClass("alert alert-danger alert-dismissible");
        }, 5000);
        var close = document.getElementsByClassName(ContactManager.selectors.close);
        for(let index = 0; index < close.length; index++){
            const element = <HTMLElement>close[index];
            element.onclick = function(){
                error.style.display = "none";
                // error.removeClass("alert alert-danger alert-dismissible");
            };
        }
    }
    private static updateContact() : void {
        var _name = (<HTMLInputElement>document.getElementById(ContactManager.selectors.name)).value;
        var _phone = (<HTMLInputElement>(ContactManager.selectors.phone)).value;
        var _email = (<HTMLInputElement>(ContactManager.selectors.email)).value;
        var _dob = (<HTMLInputElement>(ContactManager.selectors.dob)).value;
        var isValid = ContactManager.validateInput(_name, _phone, _email, _dob);
        if(isValid){
            var _address = (<HTMLInputElement>(ContactManager.selectors.address)).value;
            var _state = (<HTMLInputElement>(ContactManager.selectors.state)).value;
            var newId = ContactManager.contactList[ContactManager.currentRecord].id;
            var newContact = new Contact(newId, _name, _phone, _email, _dob, _address, _state);
            ContactManager.contactList.splice(ContactManager.currentRecord, 1, newContact);
            ContactManager.showNotification("Contact Updated");
            ContactManager.cancelUpdate();
            ContactManager.loadContacts();
        }
        else{
            var error = document.getElementById(ContactManager.selectors.error);
            error.style.display = "block";
            // error.addClass("alert alert-danger alert-dismissible");
            var close = document.getElementsByClassName(ContactManager.selectors.close);
            for(let index = 0; index < close.length; index++){
                const element = <HTMLElement>close[index];
                element.onclick = function(){
                    error.style.display = "none";
                    // error.removeClass("alert alert-danger alert-dismissible");
                };
            }
        }
    }
    private static addContact() : void {
        var _name = (<HTMLInputElement>document.getElementById(ContactManager.selectors.name)).value;
        var _phone = (<HTMLInputElement>document.getElementById(ContactManager.selectors.phone)).value;
        var _email = (<HTMLInputElement>document.getElementById(ContactManager.selectors.email)).value;
        var _dob = (<HTMLInputElement>document.getElementById(ContactManager.selectors.dob)).value;
        var isValid = ContactManager.validateInput(_name, _phone, _email, _dob);
        if(isValid){
            var _address = (<HTMLInputElement>document.getElementById(ContactManager.selectors.address)).value;
            var _state = (<HTMLInputElement>document.getElementById(ContactManager.selectors.state)).value;
            var newContact = null;
            if(ContactManager.contactList.length == 0){
                newContact = new Contact(1, _name, _phone, _email, _dob, _address, _state);
            }
            else{
                var newId = ContactManager.contactList[ContactManager.contactList.length-1].id+1;
                newContact = new Contact(newId, _name, _phone, _email, _dob, _address, _state);
            }
            ContactManager.contactList.push(newContact);
            ContactManager.showNotification("Contact Added");
            ContactManager.resetForm();
            ContactManager.loadContacts();
        }
        else{
            var error = document.getElementById(ContactManager.selectors.error);
            error.style.display = "block";
            // error.addClass("alert alert-danger alert-dismissible");
            var close = document.getElementsByClassName(ContactManager.selectors.close);
            for(let index = 0; index < close.length; index++){
                const element = <HTMLElement>close[index];
                element.onclick = function(){
                    error.style.display = "none";
                    // error.removeClass("alert alert-danger alert-dismissible");
                };
            }
        }
    }
    private static validateInput(_name, _phone, _email, _dob) : boolean {
        var error_msg = document.getElementById(ContactManager.selectors.error_msg);
        if(_name.length == 0){
            error_msg.innerHTML = "Name is Empty";
            document.getElementById(ContactManager.selectors.name).focus();
            return false;
        }
        else if(_phone.length == 0){
            error_msg.innerHTML = "Phone Number is Empty";
            document.getElementById(ContactManager.selectors.phone).focus();
            return false;
        }
        else if(!ContactManager.isPhoneNumber(_phone)){
            error_msg.innerHTML = "Phone Number should have only digits";
            document.getElementById(ContactManager.selectors.phone).focus();
            return false;
        }
        else if(_phone.length < 10){
            error_msg.innerHTML = "Phone Number should be 10 digit";
            document.getElementById(ContactManager.selectors.phone).focus();
            return false;
        } 
        else if(_email != "" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(_email))){
            error_msg.innerHTML = "InValid Email ID";
            document.getElementById(ContactManager.selectors.email).focus();
            return false;
        }
        else if(_dob != "" && !ContactManager.checkDOB(_dob)){
            error_msg.innerHTML = "DOB is Invalid";
            document.getElementById(ContactManager.selectors.dob).focus();
            return false;
        }
        return true;
    }
    private static checkDOB(_dob) : boolean {
        var newDate = new Date(_dob);
        var date = new Date();
        var minYear = date.getFullYear() - 100;
        var minDate = new Date(minYear + "-01-01");
        if(!(newDate <= date && newDate >= minDate)){
            return false;
        }
        return true;
    }
    private static isPhoneNumber(_phone) : boolean {
        var flag = true;
        for (let index = 0; index < _phone.length; index++) {
            if((_phone[index] >= 'A' && _phone[index] <= 'Z') || (_phone[index] >= 'a' && _phone[index] <= 'z')){
                flag = false;
                break;
            }
        }
        return flag;
    }
    private static resetForm() : void {
        (<HTMLInputElement>document.getElementById(ContactManager.selectors.name)).value = "";
        (<HTMLInputElement>document.getElementById(ContactManager.selectors.phone)).value = "";
        (<HTMLInputElement>document.getElementById(ContactManager.selectors.email)).value = "";
        (<HTMLInputElement>document.getElementById(ContactManager.selectors.dob)).value = "";
        (<HTMLInputElement>document.getElementById(ContactManager.selectors.address)).value = "";
        var stateOp = <HTMLSelectElement>document.getElementById(ContactManager.selectors.state);
        stateOp.selectedIndex = 0;
    }
    private static deleteSelected() : void {
        if(ContactManager.deleteFlag){
            var checkboxes = document.getElementsByName(ContactManager.selectors.checkboxes);
            var selectedCheckboxes : number[] = [];//
            for (let index = 0; index < checkboxes.length; index++) {
                var element = <HTMLInputElement>checkboxes[index];
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
                    console.log(selectedCheckboxes);
                    ContactManager.contactList.forEach(function(contact) {
                        // if(!selectedCheckboxes.includes(contact.id)){
                            tempContacts.push(contact);
                        // }
                    });
                    ContactManager.contactList = tempContacts;
                    ContactManager.loadContacts();
                    ContactManager.showNotification("Contact's Deleted..!");
                }
            }
        }
        else{
            alert("Can't delete while updating");
        }
    }
}
window.onload = function(){
    ContactManager.init();
};