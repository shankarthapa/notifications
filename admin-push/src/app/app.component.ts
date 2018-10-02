import { Component, ViewChild, ElementRef } from '@angular/core';
import * as socketIo from 'socket.io-client';
const SERVER_URL = 'http://127.0.0.1:8000';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('msg')
  private msg: ElementRef;
  private socket;
  validationMsg = '';
  isValid = -1;
  constructor() { }

  ngOnInit() {
    this.socket = socketIo(SERVER_URL);

    // for testing 
    this.socket.on('notifications', (msg) => {
      console.log('got msg ' + msg.msg);
    });
  }

  onClickSend() {
    const message = String(this.msg.nativeElement.value).trim();
    if (message === '' || message === undefined) {
      this.isValid = 0;
      this.validationMsg = 'Please enter some value. Notification not send!';
      return;
    }
    this.validationMsg = 'Notification Send';
    this.isValid = 1;
    this.socket.emit('push', message);
  }


}
