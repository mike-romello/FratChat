import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message } from '../components/pages/room-chat-overview/chat-interface';

@Injectable({
    providedIn: 'root'
})
export class MyMessageService {

    constructor() { }

    public getChannelMessages(channelID: string): Observable<Message[]> {
        // TODO 
        // GET MESSAGES FROM CHANNEL ID
        //

        const messages: Message[] = [
            {
                userName: 'Alice',
                content: 'Hello, everyone!',
                timeStamp: '2024-11-22T10:30:00Z'
            },
            {
                userName: 'Bob',
                content: 'Good morning! How is it going?',
                timeStamp: '2024-11-22T10:31:15Z'
            },
            {
                userName: 'Charlie',
                content: 'Hey Alice and Bob! It is going great.',
                timeStamp: '2024-11-22T10:32:05Z'
            },
            {
                userName: 'Alice',
                content: 'That is awesome! What are you guys working on?',
                timeStamp: '2024-11-22T10:33:22Z'
            },
            {
                userName: 'Bob',
                content: 'Just fixing some bugs in the chat application.',
                timeStamp: '2024-11-22T10:34:10Z'
            },
            {
                userName: 'Charlie',
                content: 'Same here. It is quite challenging but fun!',
                timeStamp: '2024-11-22T10:35:00Z'
            },
            {
                userName: 'Salamander_8',
                content: 'im gonna kill mike!',
                timeStamp: '2024-11-22T10:35:00Z'
            },
            {
                userName: 'Alice',
                content: 'Let’s keep things friendly here, Salamander_8!',
                timeStamp: '2024-11-22T10:37:15Z'
            },
            {
                userName: 'Bob',
                content: 'Haha, who broke the build this time?',
                timeStamp: '2024-11-22T10:37:45Z'
            },
            {
                userName: 'Charlie',
                content: 'Not me this time, I swear!',
                timeStamp: '2024-11-22T10:38:10Z'
            },
            {
                userName: 'Salamander_8',
                content: 'Okay, sorry! Just a bit frustrated with debugging.',
                timeStamp: '2024-11-22T10:39:00Z'
            },
            {
                userName: 'Alice',
                content: 'It’s all good! Debugging can be really tough.',
                timeStamp: '2024-11-22T10:40:15Z'
            },
            {
                userName: 'Bob',
                content: 'Anyone else notice that the server is running slower than usual?',
                timeStamp: '2024-11-22T10:41:20Z'
            },
            {
                userName: 'Charlie',
                content: 'Yeah, I thought it was just my machine.',
                timeStamp: '2024-11-22T10:41:45Z'
            },
            {
                userName: 'Alice',
                content: 'Let’s check the logs. Maybe there’s a memory leak.',
                timeStamp: '2024-11-22T10:42:10Z'
            },
            {
                userName: 'Salamander_8',
                content: 'Logs show a lot of 500 errors. Could be related?',
                timeStamp: '2024-11-22T10:43:05Z'
            },
            {
                userName: 'Bob',
                content: 'Definitely. Let’s dig into that.',
                timeStamp: '2024-11-22T10:43:40Z'
            },
            {
                userName: 'Alice',
                content: 'On it. I’ll keep you posted.',
                timeStamp: '2024-11-22T10:44:00Z'
            },
            {
                userName: 'Charlie',
                content: 'Thanks, Alice! Let’s hope it’s a quick fix.',
                timeStamp: '2024-11-22T10:44:30Z'
            }
        ];

        return of(messages);


    }


}


