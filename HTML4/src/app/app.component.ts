import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hide: boolean = false;
  colValue: string = "col-8";
  changeHide($event){
    this.hide = $event;
    if(this.colValue == "col-8"){
      this.colValue = "col-12";
    }
    else{
      this.colValue = "col-8";
    }
  }
}
