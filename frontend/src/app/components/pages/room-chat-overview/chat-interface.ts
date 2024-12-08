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
    id: string;
    userPk: string;
    content: string;
    timestamp: Date | null;
  }
  

