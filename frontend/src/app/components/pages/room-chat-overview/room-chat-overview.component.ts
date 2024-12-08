import { Component, OnInit } from '@angular/core';
import { MyRoomsService } from 'src/app/services/my-rooms.service';
import { Category, Channel } from './chat-interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-chat-overview',
  templateUrl: './room-chat-overview.component.html',
  styleUrls: ['./room-chat-overview.component.css']
})
export class RoomChatOverviewComponent implements OnInit {
  public roomID: string = '';
  public roomCategories: Category[] = [];
  public directMessageCategory: Category = {
    categoryID: 'directMessages',
    displayName: 'Direct Messages',
    channels: [],
  };
  public roomChannels: Channel[] = [];
  public showSideBar: boolean = true;
  public selectedChannelID: string = '';
  public selectedChannelName: string = '';
  public refreshChatArea: boolean = true;

  constructor(
    private myRoomsService: MyRoomsService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.extractIdFromRoute();
    this.setRoomCategoriesWithUsers(this.roomID);
  }

  public setRoomCategoriesWithUsers(roomID: string): void {
    this.myRoomsService.getRoomCategoriesWithUsers(roomID).subscribe(
      ({ categories, users }) => {
        // Ensure `categories` and `users` are valid arrays
        this.roomCategories = categories || [];
        const validUsers = users || [];

        // Add direct message category
        this.directMessageCategory = this.getDirectMessageCategory(validUsers);
        this.roomCategories = [...this.roomCategories, this.directMessageCategory];

        console.log(this.roomCategories);
        this.setDefaultChannel();
      },
      (error) => {
        console.error('Error fetching room categories or users:', error);
      }
    );
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

  private setDefaultChannel(): void {
    for (const category of this.roomCategories) {
      if (category.channels.length > 0) {
        const firstChannel = category.channels[0];
        this.selectedChannelID = firstChannel.channelID;
        this.selectedChannelName = firstChannel.channelName;
        return;
      }
    }
  }

  public getDirectMessageCategory(users: string[]): Category {
    const userPk: string | null = sessionStorage.getItem('accountEmail');

    if (!userPk) {
      console.error('No logged-in user found in session storage.');
      return {
        categoryID: 'directMessages',
        displayName: 'Direct Messages',
        channels: [],
      };
    }

    // Create a channel for each user, skipping the current user
    const channels = (users || [])
      .filter((otherUserPk) => otherUserPk && otherUserPk !== userPk) // Skip the logged-in user
      .map((otherUserPk) => {
        // Determine the channel ID alphabetically
        const [user1, user2] = [userPk, otherUserPk].sort();
        const channelID = `${user1}&${user2}`;

        // Return the channel object
        return {
          channelID,
          channelName: otherUserPk, // Use the other user's PK as the channel name
          messages: [], // Initialize with empty messages
        };
      });

    // Return the Category
    return {
      categoryID: 'directMessages',
      displayName: 'Direct Messages',
      channels,
    };
  }
}
