import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../pages/room-chat-overview/chat-interface';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {
  @Input() public channelID: string = "";
  public message: Message = {
    userName: undefined,
    content: '',
    timeStamp: ''
  };

  constructor() { }

  public ngOnInit(): void {
  }

  public sendMessage(): void {
    // TODO
  }

}
