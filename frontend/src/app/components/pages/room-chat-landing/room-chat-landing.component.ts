import { Component, OnInit } from '@angular/core';
import { Message } from './message-interface';

@Component({
  selector: 'app-room-chat-landing',
  templateUrl: './room-chat-landing.component.html',
  styleUrls: ['./room-chat-landing.component.css']
})
export class RoomChatLandingComponent implements OnInit {

  // Recieve this by parent component (@INPUT)
  public messages: Message[] = [
    // TEST DATA
    {user: "someone1", timestamp: "10/10/2024@11:23PM", content: "This is a test message"},
    {user: "me", timestamp: "10/10/2024@11:23PM", content: "I replied!"},
    {user: "someone2", timestamp: "10/10/2024@11:23PM", content: "Here is another test message..."}
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
