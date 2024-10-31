import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room-overview.component.html',
  styleUrls: ['./room-overview.component.css']
})
export class RoomOverviewComponent implements OnInit {
  public roomId: String = '';
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.roomId); // This will log the current 'id' parameter
  }

  public enterChat(): void {
    this.router.navigate(['/rooms', this.roomId, 'chat']);
  }

  public enterFiles(): void {
    this.router.navigate(['/rooms', this.roomId, 'files']);
  }



}
