import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent implements OnInit {
  public roomKey: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public navigateToRoom(roomKey: String): void {
      // Update tracking service
      // Navigate
      this.router.navigate(["room", "overview"]);
  }

}
