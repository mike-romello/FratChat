import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../pages/room-chat-overview/chat-interface';
import { MyMessageService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.css']
})
export class ChatAreaComponent implements OnInit {
  @Input() public channelID: string = ""
  @Input() public channelName: string = "";
  public channelMessages: Message[] = []

  constructor(private messageService: MyMessageService) { }

  public ngOnInit(): void {
    this.setChannelMessages();
    console.log(this.channelMessages)
  }

  public setChannelMessages(): void {
    this.messageService.getChannelMessages(this.channelID).subscribe(messages => {
      this.channelMessages = messages;
    });
  }

}
