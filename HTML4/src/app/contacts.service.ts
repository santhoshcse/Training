import { Injectable } from '@angular/core';
import { Contact } from './Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  static selectors : any = {
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
  contacts: Contact[] = [];
  deleteFlag: boolean = true;
  currentRecord: number = -1;
  currentContact: Contact;
  canDelete : boolean = false;
  constructor() { 
    var newContact = new Contact(1, "Santhosh", "9003435809", "gsaku0091@gmail.com", "2018-05-21", "Coimbatore", "Tamil Nadu");
    this.contacts.push(newContact);
    newContact = new Contact(2, "Kumar", "9003689126", "gsaku0092@gmail.com", "2018-04-21", "Chennai", "Tamil Nadu");
    this.contacts.push(newContact);
    this.currentContact = new Contact(0, "sam", "", "", "", "", "Select State");
  }
  editContact(contact : Contact){
    this.currentContact.id = contact.id;
    this.currentContact.name = contact.name;
    this.currentContact.phoneNumber = contact.phoneNumber;
    this.currentContact.email = contact.email;
    this.currentContact.dateOfBirth = contact.dateOfBirth;
    this.currentContact.address = contact.address;
    this.currentContact.state = contact.state;
  }
  addContact(newContact: Contact){
    this.contacts.push(newContact);
  }
  toUpdate(index, currentContact){
    this.editContact(currentContact);
    this.currentRecord = index;
  }
  deleteContact(index){
    this.contacts.splice(index, 1);
  }
  deleteContacts(contactId: number[]){
    var indexList: number[] = [];
    this.contacts.forEach(function(contact, index) {
      if(!(contactId.indexOf(contact.id) == -1)){
        indexList.push(index);
      }
    });
    for (let index = indexList.length-1; index >= 0; index--) {
      const element = indexList[index];
      this.contacts.splice(element, 1);
    }
  }
}
