export interface Category {
    categoryName: string,
    categoryID: string
    channels: Channel[]
}

export interface Channel {
    channelName: string,
    channelID: string,
    canEdit?: any[] // TODO
    canRead?: any[] // TODO
}

export interface Message {
    userName: any,
    content: string,
    timeStamp: string
}

