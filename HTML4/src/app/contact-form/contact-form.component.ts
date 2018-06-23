import { Component, OnInit } from '@angular/core';
import { Contact } from '../Contact';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu & Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman & Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry"
  ];
  currentContact : Contact;
  newContact: Contact;

  minDate: string;
  maxDate: string;

  //Selectors

  constructor(private contactsService: ContactsService) {
    this.currentContact = this.contactsService.currentContact;
    this.resetForm();
    this.setMinDate();
    this.setMaxDate();
  }

  private setMinDate() : void {
    var minDate = new Date();
    var yyyy = minDate.getFullYear() - 100;
    var dd = "01";
    var mm = "01";
    this.minDate = yyyy + "-" + mm + "-" + dd;
  }

  private setMaxDate() : void {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var _dd, _mm;
    if(dd<10){
      _dd = '0' + dd;
    }
    else{
      _dd = dd;
    }
    if(mm<10){
      _mm = '0' + mm;
    }
    else{
      _mm = mm;
    }
    this.maxDate = yyyy + '-' + _mm + '-' + _dd;
  }

  resetForm() : void {
    this.currentContact.name = "";
    this.currentContact.phoneNumber = "";
    this.currentContact.email = "";
    this.currentContact.dateOfBirth = "";
    this.currentContact.address = "";
    this.currentContact.state = "Select State";
  }

  clickable(pointerEvent : string) : void {
    var dIcon = document.getElementsByClassName(ContactsService.selectors.dIcon);
    for (let index = 0; index < dIcon.length; index++){
      const element = <HTMLElement>dIcon[index];
      element.style.pointerEvents = pointerEvent;
    }
    this.contactsService.canDelete = false;
  }

  cancelUpdate() : void {
    this.contactsService.deleteFlag = true;
    var add_Contact = document.getElementById(ContactsService.selectors.add_Contact);
    add_Contact.style.display = "block";
    var update_Contact = document.getElementById(ContactsService.selectors.update_Contact);
    update_Contact.style.display = "none";
    var reset = document.getElementById(ContactsService.selectors.reset);
    reset.style.display = "block";
    var cancel = document.getElementById(ContactsService.selectors.cancel);
    cancel.style.display = "none";
    this.resetForm();
    this.clickable("auto");
  }

  private checkDOB() : boolean {
    var newDate = new Date(this.currentContact.dateOfBirth);
    var date = new Date();
    var minYear = date.getFullYear() - 100;
    var minDate = new Date(minYear + "-01-01");
    if(!(newDate <= date && newDate >= minDate)){
        return false;
    }
    return true;
  }

  private isPhoneNumber() : boolean {
    var flag = true;
    for (let index = 0; index < this.currentContact.phoneNumber.length; index++) {
        if((this.currentContact.phoneNumber[index] >= 'A' && this.currentContact.phoneNumber[index] <= 'Z') || (this.currentContact.phoneNumber[index] >= 'a' && this.currentContact.phoneNumber[index] <= 'z')){
            flag = false;
            break;
        }
    }
    return flag;
  }

  private validateInput() : boolean {
    var error_msg = document.getElementById(ContactsService.selectors.error_msg);
    if(this.currentContact.name.length == 0){
      error_msg.innerHTML = "Name is Empty";
      document.getElementById(ContactsService.selectors.name).focus();
      return false;
    }
    else if(this.currentContact.phoneNumber.length == 0){
      error_msg.innerHTML = "Phone Number is Empty";
      document.getElementById(ContactsService.selectors.phone).focus();
      return false;
    }
    else if(!this.isPhoneNumber()){
      error_msg.innerHTML = "Phone Number should have only digits";
      document.getElementById(ContactsService.selectors.phone).focus();
      return false;
    }
    else if(this.currentContact.phoneNumber.length < 10){
      error_msg.innerHTML = "Phone Number should be 10 digit";
      document.getElementById(ContactsService.selectors.phone).focus();
      return false;
    } 
    else if(this.currentContact.email != "" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.currentContact.email))){
      error_msg.innerHTML = "InValid Email ID";
      document.getElementById(ContactsService.selectors.email).focus();
      return false;
    }
    else if(this.currentContact.dateOfBirth != "" && !this.checkDOB()){
      error_msg.innerHTML = "DOB is Invalid\nDOB should be in (" + this.minDate + " - " + this.maxDate + ")";
      document.getElementById(ContactsService.selectors.dob).focus();
      return false;
    }
    return true;
  }

  private removeNotificationSuccess(error : HTMLElement){
    error.classList.remove("alert");
    error.classList.remove("alert-success");
    error.classList.remove("alert-dismissible");
  }
  private removeNotificationDanger(error : HTMLElement){
    error.classList.remove("alert");
    error.classList.remove("alert-danger");
    error.classList.remove("alert-dismissible");
  }
  private addNotificationDanger(error : HTMLElement){
    error.classList.add("alert");
    error.classList.add("alert-danger");
    error.classList.add("alert-dismissible");
  }

  private showNotification(message : string) : void {
    var error = document.getElementById(ContactsService.selectors.error);
    var error_msg = document.getElementById(ContactsService.selectors.error_msg);
    error_msg.innerHTML = message;
    error.style.display = "block";
    this.removeNotificationDanger(error);
    error.classList.add("alert");
    error.classList.add("alert-success");
    error.classList.add("alert-dismissible");
    setTimeout(() => {
      error.style.display = "none";
      this.removeNotificationSuccess(error);
    }, 5000);
    var close = document.getElementsByClassName(ContactsService.selectors.close);
    for(let index = 0; index < close.length; index++){
      const element = <HTMLElement>close[index];
      element.onclick = () => {
        error.style.display = "none";
        this.removeNotificationSuccess(error);
      };
    }
  }

  addContact() {
    var isValid = this.validateInput();
    if(isValid){
      if(this.contactsService.contacts.length == 0){
        this.currentContact.id = 1;
        this.newContact = new Contact(1, this.currentContact.name, this.currentContact.phoneNumber, this.currentContact.email, this.currentContact.dateOfBirth, this.currentContact.address, this.currentContact.state);
      }
      else{
        var newId = this.contactsService.contacts[this.contactsService.contacts.length-1].id+1;
        this.currentContact.id = newId;
        this.newContact = new Contact(newId, this.currentContact.name, this.currentContact.phoneNumber, this.currentContact.email, this.currentContact.dateOfBirth, this.currentContact.address, this.currentContact.state);
      }
      this.contactsService.addContact(this.newContact);
      this.showNotification("Contact Added");
      this.resetForm();
    }
    else{
      var error = document.getElementById(ContactsService.selectors.error);
      error.style.display = "block";
      this.removeNotificationSuccess(error);
      this.addNotificationDanger(error);
      var close = document.getElementsByClassName(ContactsService.selectors.close);
      for(let index = 0; index < close.length; index++){
        const element = <HTMLElement>close[index];
        element.onclick = () => {
          error.style.display = "none";
          this.removeNotificationDanger(error);
        };
      }
    }
  }

  updateContact() : void {
    var isValid = this.validateInput();
    if(isValid){
      var newId = this.contactsService.contacts[this.contactsService.currentRecord].id;
      var newContact = new Contact(newId, this.currentContact.name, this.currentContact.phoneNumber, this.currentContact.email, this.currentContact.dateOfBirth, this.currentContact.address, this.currentContact.state);
      this.contactsService.contacts.splice(this.contactsService.currentRecord, 1, newContact);
      this.showNotification("Contact Updated");
      this.cancelUpdate();
    }
    else{
      var error = document.getElementById(ContactsService.selectors.error);
      error.style.display = "block";
      this.removeNotificationSuccess(error);
      this.addNotificationDanger(error);
      var close = document.getElementsByClassName(ContactsService.selectors.close);
      for(let index = 0; index < close.length; index++){
        const element = <HTMLElement>close[index];
        element.onclick = () => {
          error.style.display = "none";
          this.removeNotificationDanger(error);
        };
      }
    }
  }

  ngOnInit() {
  }
}
