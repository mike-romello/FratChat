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

  /**
 * Fetch categories for a specific room by its roomID.
 * @param roomID - Primary key of the room
 * @returns Observable of Category[]
 */
public getRoomCategories(roomID: string): Observable<Category[]> {
  if (!roomID) {
    console.error('Room ID is required to fetch categories.');
    return of([]); // Return an empty array if no roomID is provided
  }

  return this.http
    .get<{ success: boolean; categories: any[] }>(`${this.baseUrl}/categories?roomKey=${roomID}`)
    .pipe(
      map((response) => {
        if (response.success) {
          // Map the API response to match the Category interface
          return response.categories.map((category) => ({
            categoryID: category.pk, // Map 'pk' to 'categoryID'
            displayName: category.displayName,
            channels: category.channels.map((channel: any) => ({
              channelID: channel.channelId, // Map 'channelId' to 'channelID'
              channelName: channel.displayName, // Map 'displayName' to 'channelName'
              messages: [] // Initialize messages as an empty array
            }))
          }));
        }
        return []; // Return an empty array if success is false
      }),
      catchError((error) => {
        console.error('Error fetching room categories:', error);
        return of([]); // Handle errors gracefully by returning an empty array
      })
    );
}
}
