import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BasicRoomInfo } from '../components/pages/my-rooms/roomInfo-interface';

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
}
