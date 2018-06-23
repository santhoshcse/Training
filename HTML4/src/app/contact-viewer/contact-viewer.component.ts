import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../Contact';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-viewer',
  templateUrl: './contact-viewer.component.html',
  styleUrls: ['./contact-viewer.component.css']
})
export class ContactViewerComponent implements OnInit {
  hide: boolean = false;
  @Output("hideFlag") emitFlag = new EventEmitter<boolean>();
  contacts : Contact[] = [];
  toggleForm(): void {
    this.hide = !this.hide;
    this.emitFlag.emit(this.hide);
  }

  constructor(private contactsService: ContactsService) { 
    this.contacts = this.contactsService.contacts;
  }

  selectDeselect(status : boolean) : void {
    var checkboxes = document.getElementsByName(ContactsService.selectors.checkboxes);
    for (let index = 0; index < checkboxes.length; index++) {
      var element = <HTMLInputElement>checkboxes[index];
      element.checked = status;
    }
  }

  clickable(pointerEvent : string, attr : string) : void {
    var dIcon = document.getElementsByClassName(ContactsService.selectors.dIcon);
    for (let index = 0; index < dIcon.length; index++){
      const element = <HTMLElement>dIcon[index];
      element.style.pointerEvents = pointerEvent;
    }
    this.contactsService.canDelete = (attr=="add") ? true : false;
  }

  deleteContact(index: number) : void {
    if(confirm("Confirm Delete ?")){
      this.contactsService.deleteContact(index);
    }
  }

  toUpdate(index, currentContact) : void {
    this.contactsService.toUpdate(index, currentContact);
    var add_Contact = document.getElementById(ContactsService.selectors.add_Contact);
    add_Contact.style.display = "none";
    var update_Contact = document.getElementById(ContactsService.selectors.update_Contact);
    update_Contact.style.display = "block";
    var reset = document.getElementById(ContactsService.selectors.reset);
    reset.style.display = "none";
    var cancel = document.getElementById(ContactsService.selectors.cancel);
    cancel.style.display = "block";
  }

  deleteUpdateUtil(current): void {
    var cmd = current[0];
    var index = current[1];
    var currentContact = current[2];
    if(cmd == 0){
      if(this.contactsService.deleteFlag){
        this.deleteContact(index);
      }
      else{
        alert("Can't delete while updating");
      }
    }
    else if(cmd == 1){
      document.getElementById(ContactsService.selectors.form).style.display = "block";//bug
      this.toUpdate(index, currentContact);
      this.contactsService.deleteFlag = false;
      this.clickable("none", "add");
    }
  }

  deleteSelected() : void {
    if(this.contactsService.deleteFlag){
      var checkboxes = document.getElementsByName(ContactsService.selectors.checkboxes);
      var selectedCheckboxes : number[] = [];
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
          console.log(selectedCheckboxes);
          this.contactsService.deleteContacts(selectedCheckboxes);
        }
      }
    }
    else{
      alert("Can't delete while updating");
    }
  }

  ngOnInit() {
  }

}
