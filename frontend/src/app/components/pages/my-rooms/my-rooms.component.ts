import { Component, OnInit } from '@angular/core';
import { MyRoomsService } from 'src/app/services/my-rooms.service';
import { BasicRoomInfo } from './roomInfo-interface';

@Component({
  selector: 'app-my-rooms',
  templateUrl: './my-rooms.component.html',
  styleUrls: ['./my-rooms.component.css']
})
export class MyRoomsComponent implements OnInit {
  public myBasicRoomsData: BasicRoomInfo[] = [];
  public userName: string = "";

  constructor(private myRoomsService: MyRoomsService) {}

  public ngOnInit(): void {
    this.setUserName();
    this.getMyRoomsData();

  }

  public getMyRoomsData(): any {
    this.myRoomsService.getBasicRoomInfo().subscribe(rooms => {
      this.myBasicRoomsData = rooms;
    });
  }

  public setUserName(): void{
    // TODO pull from session Storage

    // Temp
    this.userName = "Salamander_8"
  }

  public logout(): void{
    // TODO

    // Temp
    console.log("logging out..")
  }

}
