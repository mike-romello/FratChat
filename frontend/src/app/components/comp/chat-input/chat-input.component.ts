import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../../pages/room-chat-overview/chat-interface';
import { MessageService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {
  @Input() public channelID: string = '';
  @Output() public messageSent: EventEmitter<Message> = new EventEmitter<Message>();
  public messageContent: string = '';

  constructor(private messageService: MessageService) { }

  public ngOnInit(): void { }

  public sendMessage(): void {
    const userPk: string | null = sessionStorage.getItem('accountEmail');
    if (this.messageContent.trim() && userPk) {
      const message: Message = {
        userPk: userPk, 
        content: this.messageContent.trim(),
        timestamp: new Date(),
        id: '' // Will be ignored by the backend and replaced with a generated ID
      };

      this.postMessage(message);
    } else {
      console.log('Cannot send an empty message or send without userPk');
    }
  }

  public postMessage(message: Message): void {
    this.messageService.postChannelMessage(this.channelID, message).subscribe({
      next: (response) => {
        console.log('Message successfully posted:', response);
        this.messageSent.emit(message); // Emit message only after successful post
        this.messageContent = ''; // Clear input after sending
      },
      error: (error) => {
        console.error('Error posting message:', error);
      },
      complete: () => {
        console.log('Message post operation completed.');
      }
    });
  }
}
