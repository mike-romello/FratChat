export interface Category {
    categoryID: string
    displayName: string,
    channels: any[],
}

export interface Channel {
    channelName: string,
    channelID: string,
    messages: string[]
}

export interface Message {
    userName: any,
    content: string,
    timeStamp: string
}

