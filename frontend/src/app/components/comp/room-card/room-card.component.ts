import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent implements OnInit {
  @Input() public roomID: string = "";
  @Input() public roomName: string = "";

  constructor(private router: Router) { }

  public ngOnInit(): void {

  }

  public navigateToRoom(): void {
    this.router.navigate(["my-rooms", this.roomID, "chat"]);
  }


}