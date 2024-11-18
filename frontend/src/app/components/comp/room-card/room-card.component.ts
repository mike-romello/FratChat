import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent implements OnInit {
  @Input() public roomKey: string = "";

  constructor(private router: Router) { }

  public ngOnInit(): void {
  
  }

  public navigateToRoom(roomKey: String): void {
      // Update tracking service
      // Navigate
      this.router.navigate(["room", "overview"]);
  }


}
