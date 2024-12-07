import { Component, OnInit } from '@angular/core';
import { MyRoomsService } from 'src/app/services/my-rooms.service';
import { Category, Channel } from './chat-interface';
import { ActivatedRoute } from '@angular/router';
import { computeMsgId } from '@angular/compiler';

@Component({
  selector: 'app-room-chat-overview',
  templateUrl: './room-chat-overview.component.html',
  styleUrls: ['./room-chat-overview.component.css']
})
export class RoomChatOverviewComponent implements OnInit {
  public roomID: string = '';
  public roomCategories: Category[] = [];
  public roomChannels: Channel[] = []
  public showSideBar: boolean = true;
  public selectedChannelID: string = "";
  public selectedChannelName: string = "";
  public refreshChatArea: boolean = true;

  constructor(
    private myRoomsService: MyRoomsService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.extractIdFromRoute();
    this.setRoomCategories(this.roomID);
  }

  public setRoomCategories(roomID: string): void {
    this.myRoomsService.getRoomCategories(roomID).subscribe((categories) => {
      this.roomCategories = categories;
      console.log(this.roomCategories)
    });
  }

  public toggleSidebar(): void {
    this.showSideBar = !this.showSideBar;
  }

  public changeChatArea(channelID: string, channelName: string): void {
    this.refreshChatArea = false;
    setTimeout(() => {
      this.selectedChannelID = channelID;
      this.selectedChannelName = channelName;
      this.refreshChatArea = true;
    }, 0);
  }

  private extractIdFromRoute(): void {
    this.route.paramMap.subscribe((params) => {
      this.roomID = params.get('id') || '';
    });
  }

}
