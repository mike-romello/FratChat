import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BasicRoomInfo } from '../components/pages/my-rooms/roomInfo-interface';
import { Category, Channel } from '../components/pages/room-chat-overview/chat-interface';

@Injectable({
  providedIn: 'root'
})
export class MyRoomsService {

  constructor() { }


  public getBasicRoomInfo(): Observable<BasicRoomInfo[]> {
    // TO DO
    // Call http method
    // parse it to type basic room info
    // return that as observable

    // Temp Data
    const testRooms: BasicRoomInfo[] = [
      { roomName: 'Phi Kappa Psi', roomID: '1' },
      { roomName: 'Drexel Esports', roomID: '2' }
    ];
    return of(testRooms);
  }

  public getRoomCategories(): Observable<Category[]> {
    // To Do
    // Call http method
    // parse it to type category
    // return that as observable

    // Temp Data
    const channels: Channel[] = [
      {channelID: "1", channelName: "Channel 1"},
      {channelID: "2", channelName: "Channel 2"},
      {channelID: "3", channelName: "Channel 3"},
      {channelID: "4", channelName: "Channel 4"},
      {channelID: "5", channelName: "Channel 5"},
      {channelID: "6", channelName: "Channel 6"},
      {channelID: "7", channelName: "Channel 7"},
      {channelID: "8", channelName: "Channel 8"},
      {channelID: "9", channelName: "Channel 9"},
    ];

    const testCategories: Category[] = [
      {categoryID: "1", categoryName: "Category 1", channels: [channels[0], channels[1], channels[2]]},
      {categoryID: "2", categoryName: "Category 2", channels: [channels[3], channels[4], channels[5]]},
      {categoryID: "3", categoryName: "Category 3", channels: [channels[6], channels[7], channels[8]]},
    ];
    return of(testCategories);
  
  }
}


