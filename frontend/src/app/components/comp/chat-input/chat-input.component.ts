import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../../pages/room-chat-overview/chat-interface';
import { MyMessageService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {
  @Input() public channelID: string = '';
  @Output() public messageSent: EventEmitter<Message> = new EventEmitter<Message>();
  public messageContent: string = '';

  constructor(private messageService: MyMessageService) {}

  public ngOnInit(): void {}

  public sendMessage(): void {
    if (this.messageContent.trim()) {
      const message: Message = {
        userName: 'TempUser', // TEMP
        content: this.messageContent,
        timeStamp: new Date().toISOString()
      };

      this.postMessage(message);
      this.messageSent.emit(message);
      this.messageContent = '';
    } else {
      console.log('Cannot send an empty message');
    }
  }

  public postMessage(message: Message): void {
    this.messageService.postChannelMessage(this.channelID, message);
  }
}
