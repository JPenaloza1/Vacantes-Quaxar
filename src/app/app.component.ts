import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Project';
  toast = '';
  toastColor = '';

  public message(toast:string,toastColor:string = 'success'){
    this.toast = toast;
    this.toastColor = toastColor;
    setInterval(()=>{
      this.toast ='';
    },3000)
  }

}
