import { Component, OnInit } from '@angular/core';
import { MyRoomsService } from 'src/app/services/my-rooms.service';
import { Category } from './chat-interface';

@Component({
  selector: 'app-room-chat-overview',
  templateUrl: './room-chat-overview.component.html',
  styleUrls: ['./room-chat-overview.component.css']
})
export class RoomChatOverviewComponent implements OnInit {
  public roomCategories: Category[] = [];
  public showSideBar: boolean = true;
  public selectedChannelID: string = "";
  public selectedChannelName: string = "";

  constructor(private myRoomsService: MyRoomsService) {}

  public ngOnInit(): void {
    this.setRoomCategories();

  }

  public setRoomCategories(): void {
    this.myRoomsService.getRoomCategories().subscribe((categories) => {
      this.roomCategories = categories;
    });
  }

  public toggleSidebar(): void {
    this.showSideBar = !this.showSideBar;
  }

  public changeChatArea(channelID: string, channelName: string): void {
    this.selectedChannelID = channelID;
    this.selectedChannelName = channelName; 
  }
}
