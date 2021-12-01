export interface IUser {
  id: number,
  name: string
}

export interface IConversation {
  id: number,
  created: string,
  updated: string,
  name: string,
  _embedded: {
    lastMessage: IMessage,
    owner: IUser
  }
}

export interface IMessage {
  id: number,
  text: string,
  created: string,
  _embedded: {
    conversation: IConversation,
    recipient: IUser,
    owner: IUser
  }
}

export interface IReceivedMessage {
  text: string,
  recipient: string,
  conversation: string,
  owner: string,
  created: string
}

export interface ISendMessage {
  text: string,
  recipient: string,
  conversation: string
}

export interface ITyping {
  isTyping: boolean,
  recipient: string,
  conversation: string
}
