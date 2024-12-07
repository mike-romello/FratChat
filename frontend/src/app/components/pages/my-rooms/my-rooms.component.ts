import { Component, OnInit } from '@angular/core';
import { MyRoomsService } from 'src/app/services/my-rooms.service';
import { BasicRoomInfo } from './roomInfo-interface';
import { User } from 'src/app/services/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-my-rooms',
  templateUrl: './my-rooms.component.html',
  styleUrls: ['./my-rooms.component.css']
})
export class MyRoomsComponent implements OnInit {
  public myBasicRoomsData: BasicRoomInfo[] = [];
  public user: User = {
    email: '',
    displayName: 'User Not Found',
    photoURL: ''
  };

  constructor(
    private myRoomsService: MyRoomsService,
    private userService: UserService
  ) {}

  public ngOnInit(): void {
    this.setUserFromSession();
    this.setMyRoomsData();
  }

  /**
   * Set user data from session storage.
   */
  private setUserFromSession(): void {
    this.user = {
      email: sessionStorage.getItem('accountEmail') || '',
      displayName: sessionStorage.getItem('accountName') || 'User Not Found',
      photoURL: sessionStorage.getItem('accountPhotoURL') || ''
    };
  }

  /**
   * Fetch and set basic room data.
   */
  private setMyRoomsData(): void {
    this.myRoomsService.getBasicRoomInfo().subscribe((rooms) => {
      this.myBasicRoomsData = rooms;
    });
  }

  /**
   * Log out the user.
   */
  public logout(): void {
    this.userService.logout();
  }
}
