export interface IConversation {
  name: string,
  lastMessage: string
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
