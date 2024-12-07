import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Room } from '../components/pages/my-rooms/roomInfo-interface';
import { Category, Channel } from '../components/pages/room-chat-overview/chat-interface';

@Injectable({
  providedIn: 'root',
})
export class MyRoomsService {
  private readonly baseUrl = 'http://localhost:3000'; // Adjust to your backend URL

  constructor(private http: HttpClient) {}

  /**
   * Fetch the rooms associated with the current user.
   * @returns Observable of Room[]
   */
  public getMyRooms(userKey: string): Observable<Room[]> {
    return this.http
      .get<{ success: boolean; rooms: string[] }>(`${this.baseUrl}/my-rooms?userkey=${userKey}`)
      .pipe(
        switchMap((response) => {
          if (response.success && response.rooms.length > 0) {
            // Fetch details for each room
            const roomDetailsRequests = response.rooms.map((roomID) =>
              this.getRoomDetails(roomID)
            );
            return forkJoin(roomDetailsRequests); // Combine all requests
          }
          return of([]); // Return empty array if no rooms
        }),
        catchError((error) => {
          console.error('Error fetching rooms:', error);
          return of([]); // Handle errors gracefully
        })
      );
  }

  /**
   * Fetch details of a specific room by roomID.
   * @param roomID - The primary key of the room
   * @returns Observable of Room
   */
  private getRoomDetails(roomID: string): Observable<Room> {
    return this.http.get<{ success: boolean; room: Room }>(`${this.baseUrl}/rooms?pk=${roomID}`).pipe(
      map((response) => {
        if (response.success) {
          return response.room;
        }
        throw new Error(`Room ${roomID} not found.`);
      }),
      catchError((error) => {
        console.error(`Error fetching details for room ${roomID}:`, error);
        return of({
          roomID,
          displayName: `Unknown Room (${roomID})`,
          channels: [],
          users: [],
        }); // Return fallback room details
      })
    );
  }

  // LEAVE ALL BELOW ALONE FOR NOW
  public getRoomCategories(): Observable<Category[]> {
    // To Do
    // Call http method
    // parse it to type category
    // return that as observable

    // Temp Data
    const channels: Channel[] = [
      { channelID: '1', channelName: 'Channel 1' },
      { channelID: '2', channelName: 'Channel 2' },
      { channelID: '3', channelName: 'Channel 3' },
      { channelID: '4', channelName: 'Channel 4' },
      { channelID: '5', channelName: 'Channel 5' },
      { channelID: '6', channelName: 'Channel 6' },
      { channelID: '7', channelName: 'Channel 7' },
      { channelID: '8', channelName: 'Channel 8' },
      { channelID: '9', channelName: 'Channel 9' },
    ];

    const testCategories: Category[] = [
      { categoryID: '1', categoryName: 'Category 1', channels: [channels[0], channels[1], channels[2]] },
      { categoryID: '2', categoryName: 'Category 2', channels: [channels[3], channels[4], channels[5]] },
      { categoryID: '3', categoryName: 'Category 3', channels: [channels[6], channels[7], channels[8]] },
    ];
    return of(testCategories);
  }
}
