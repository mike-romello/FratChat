import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../pages/room-chat-overview/chat-interface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message: Message = {
    userPk: "",
    content: "",
    timestamp: new Date(),
    id: ""
  };

  constructor() { }

  public ngOnInit(): void {
  }

}
