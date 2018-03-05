import { Component, OnInit, ViewChild, AfterViewChecked, ElementRef } from '@angular/core';
import { ChatService } from "../../services/ChatService";
import { SessionService } from "../../services/session.service";
import { Router } from "@angular/router";



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  toSend: string;
  
  
  constructor(
    public chat: ChatService,
    public session: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.session.user == undefined) {
      this.router.navigate(["/login"]);
    }
    this.scrollToBottom();
  }

  sendMessage() {
    //console.log(`Enviando mensaje: ${this.toSend}`);
    this.chat.sendMessage(this.toSend);
    this.toSend = "";
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
   }

}