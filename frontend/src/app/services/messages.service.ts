import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Message } from '../components/pages/room-chat-overview/chat-interface';
import { HttpService } from './http/http.service';
import { apiEnum } from './http/api-enum';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private httpService: HttpService) { }

  /**
   * Fetch all messages for a specific channel by its channelID.
   * @param channelID - Primary key of the channel
   * @returns Observable<Message[]>
   */
  public getChannelMessages(channelID: string): Observable<Message[]> {
    if (!channelID) {
      console.error('Channel ID is required to fetch messages.');
      return of([]); // Return an empty array if no channelID is provided
    }

    return this.httpService.get(`${apiEnum.MESSAGES}${channelID}`).pipe(
      map((response) => {
        if (response.success) {
          return response.messages.map((message: any) => ({
            id: message.id,
            userPk: message.userPk,
            content: message.content,
            timestamp: message.timestamp ? new Date(message.timestamp) : null,
          }));
        }
        return []; // Return an empty array if success is false
      }),
      catchError((error) => {
        console.error('Error fetching channel messages:', error);
        return of([]); // Handle errors gracefully by returning an empty array
      })
    );
  }

  /**
   * Post a new message to a specific channel.
   * @param channelID - Primary key of the channel
   * @param message - Message to post
   * @returns Observable<any>
   */
  public postChannelMessage(channelID: string, message: Message): Observable<any> {
    if (!channelID) {
      console.error('Channel ID is required to post messages.');
      return of(null);
    }
  
    const body = {
      userPk: message.userPk,
      content: message.content,
      timestamp: message.timestamp ? message.timestamp.toISOString() : new Date().toISOString(),
    };
  
    console.log('Sending message payload:', body);
  
    return this.httpService.post(`messages?channelKey=${channelID}`, body).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Error posting message:', error.error || error.message);
        throw error;
      })
    );
  }
}
