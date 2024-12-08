import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Room } from '../components/pages/my-rooms/roomInfo-interface';
import { Category } from '../components/pages/room-chat-overview/chat-interface';
import { apiEnum } from './http/api-enum';
import { HttpService } from './http/http.service';

@Injectable({
  providedIn: 'root',
})
export class MyRoomsService {
  constructor(private httpService: HttpService) {}

  /**
   * Fetch the rooms associated with the current user.
   * @param userKey - The primary key of the user
   * @returns Observable of Room[]
   */
  public getMyRooms(userKey: string): Observable<Room[]> {
    return this.httpService
      .get(`${apiEnum.MY_ROOMS}${userKey}`)
      .pipe(
        switchMap((response: { success: boolean; rooms: string[] }) => {
          if (response.success && response.rooms.length > 0) {
            // Fetch details for each room
            const roomDetailsRequests = response.rooms.map((roomID) =>
              this.getRoomDetails(roomID)
            );
            return forkJoin(roomDetailsRequests); // Combine all requests
          }
          return of([]); // Return an empty array if no rooms
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
    return this.httpService.get(`${apiEnum.ROOMS}${roomID}`).pipe(
      map((response: { success: boolean; room: Room }) => {
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
   * Fetch categories and users for a specific room by its roomID.
   * @param roomID - Primary key of the room
   * @returns Observable<{ categories: Category[]; users: string[] }>
   */
  public getRoomCategoriesWithUsers(roomID: string): Observable<{ categories: Category[]; users: string[] }> {
    if (!roomID) {
      console.error('Room ID is required to fetch categories.');
      return of({ categories: [], users: [] }); // Return empty arrays if no roomID is provided
    }

    return this.httpService
      .get(`${apiEnum.CATEGORIES}${roomID}`)
      .pipe(
        map((response: { success: boolean; categories: any[]; users: string[] }) => {
          if (response.success) {
            const categories = response.categories.map((category) => ({
              categoryID: category.pk, // Map 'pk' to 'categoryID'
              displayName: category.displayName,
              channels: category.channels.map((channel: any) => ({
                channelID: channel.channelId, // Map 'channelId' to 'channelID'
                channelName: channel.displayName, // Map 'displayName' to 'channelName'
                messages: [] // Initialize messages as an empty array
              })),
            }));

            const users = response.users; // Extract users array
            return { categories, users };
          }
          return { categories: [], users: [] }; // Return empty arrays if success is false
        }),
        catchError((error) => {
          console.error('Error fetching room categories and users:', error);
          return of({ categories: [], users: [] }); // Handle errors gracefully by returning empty arrays
        })
      );
  }

}
