export interface IUser {
  id: number,
  name: string
}

export interface IConversation {
  id: number,
  created: string,
  updated: string,
  _embedded: {
    lastMessage: IMessage,
    recipient: IUser,
    owner: IUser
  }
}

export interface IMessage {
  id: number,
  text: string,
  created: string,
  updated: string,
  _embedded: {
    conversation: IConversation,
    recipient: IUser,
    owner: IUser
  }
}
