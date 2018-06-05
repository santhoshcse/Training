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
        checkboxes : "[name=select-contact]",
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
        view : "view-point"
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
    private static setMinDate() : void {
        var minDate = new Date();
        var yyyy = minDate.getFullYear() - 100;
        var dd = "01";
        var mm = "01";
        var _minDate = yyyy + "-" + mm + "-" + dd;
        // $(ContactManager.selectors.dob).attr("min", _minDate);
    }
    private static createStateOptions() : void {
        var state = document.getElementById(ContactManager.selectors.state);
        for (let prop in ContactManager.states) {
            // state.append( $("<option>").val(prop).html(ContactManager.states[prop]));
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
            console.log(ContactManager.contactList);
        }
        else{
            tableContent = "<table id=\"list\" class=\"table-bordered table-hover\"><thead><tr><th>Select</th><th>Name</th><th>Mobile Number</th><th>EMail</th><th>DOB</th><th>Address</th><th>State</th><th>Actions</th></tr></thead></table>";
            contacts.innerHTML = tableContent;
        }
    }
    private static selectDeselect(status : boolean) : void {
        var checkboxes = document.getElementsByName(ContactManager.selectors.checkboxes);
        for (let index = 0; index < checkboxes.length; index++) {
            var element = checkboxes[index];
            // element.checked = status;
        }
    }
    private static deleteUpdateUtil(clickedImg : string) : void {
        var rowNumber = parseInt(clickedImg);
        var selectedRecord;
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
            $(ContactManager.selectors.form).show();
            ContactManager.toUpdate();
            ContactManager.deleteFlag = false;
            ContactManager.clickable("none", "disabled", "active", "add");
        }
    }
    private static clickable(pointerEvent : string, add : string, remove : string, attr : string) : void {
        var $dIcon = $(ContactManager.selectors.dIcon);
        $dIcon.css("pointerEvents", pointerEvent);
        var $del = $(ContactManager.selectors.deleteBtn);
        $del.addClass(add);
        $del.removeClass(remove);
        if(attr == "add"){
            $del.attr("disabled", "disabled");
        }
        else{
            $del.removeAttr("disabled", "disabled");
        }
        // $del.css("pointerEvents", pointerEvent);
    }
    private static toUpdate() : void {

    }
    private static deleteContact() : void {
        if(confirm("Confirm Delete ?")){
            ContactManager.contactList.splice(ContactManager.currentRecord, 1);
            ContactManager.loadContacts();
            ContactManager.showNotification("Contact Deleted..!");
        }
    }
    private static showNotification(message : string) : void {
        
    }
    private static deleteSelected() : void {

    }
    private static addContact() : void {

    }
    private static resetForm() : void {

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
        var $unSelectAll = document.getElementById(ContactManager.selectors.unSelectAll);
        $unSelectAll.onclick = function(){
            ContactManager.selectDeselect(false);
        };
        var add_Contact = document.getElementById(ContactManager.selectors.add_Contact);
        add_Contact.onclick = ContactManager.addContact;
        var reset = document.getElementById(ContactManager.selectors.reset);
        reset.onclick = ContactManager.resetForm;
        var toggle = document.getElementById(ContactManager.selectors.toggle);
        toggle.onclick = function(){
            // $(ContactManager.selectors.form).toggle();
            var view = document.getElementById(ContactManager.selectors.view);
            // if($view.attr("class") == "col-8"){
                // $view.attr("class", "col-12");
            // }
            // else{
                // $view.attr("class", "col-8");
            // }
        };
    }
}
window.onload = function(){
    ContactManager.init();
};