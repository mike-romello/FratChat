import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message-interface';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.css']
})
export class ChatAreaComponent implements OnInit {

  @Input() public messages: Message[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
