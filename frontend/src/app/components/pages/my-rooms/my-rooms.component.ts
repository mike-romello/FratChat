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
  public userPk: string = '';
  public userName: string = '';
  public userPhotoURL: string = '';

  constructor(private myRoomsService: MyRoomsService) {}

  public ngOnInit(): void {
    this.userPk = sessionStorage.getItem("accountEmail") || "";
    this.userName = sessionStorage.getItem("accountName") || "User Not Found";
    this.userPhotoURL = sessionStorage.getItem("accountPhotoURL") || "User Not Found";

    this.setMyRoomsData();
  }

  public setMyRoomsData(): void {
    this.myRoomsService.getBasicRoomInfo().subscribe(rooms => {
      this.myBasicRoomsData = rooms;
    });
  }

  public logout(): void{
    // TODO

    // Temp
    console.log("logging out..")
  }

}
