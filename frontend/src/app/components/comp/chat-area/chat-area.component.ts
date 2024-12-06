import { Component, Input, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { Message } from '../../pages/room-chat-overview/chat-interface';
import { MyMessageService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.css']
})
export class ChatAreaComponent implements OnInit, AfterViewChecked {
  @Input() public channelID: string = "";
  @Input() public channelName: string = "";
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  public channelMessages: Message[] = []

  constructor(private messageService: MyMessageService) { }

  public ngOnInit(): void {
    this.setChannelMessages();
  }

  public ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  public setChannelMessages(): void {
    this.messageService.getChannelMessages(this.channelID).subscribe(messages => {
      this.channelMessages = messages;
    });
  }

  public handleMessage(message: Message): void {
    this.channelMessages.push(message);
  }

  public scrollToBottom(): void {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    }
  }
}
