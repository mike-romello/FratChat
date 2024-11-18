import { Component, OnInit } from '@angular/core';
import { MyRoomsService } from 'src/app/services/my-rooms.service';

@Component({
  selector: 'app-my-rooms',
  templateUrl: './my-rooms.component.html',
  styleUrls: ['./my-rooms.component.css']
})
export class MyRoomsComponent implements OnInit {
  public myRoomsData = [];

  constructor(private myRoomsService: MyRoomsService) {}

  public ngOnInit(): void {

  }

  public getMyRoomsData(): any {
    

  }

}
