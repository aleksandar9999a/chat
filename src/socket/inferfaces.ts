import { IReceivedMessage, ISendMessage, ITyping } from '../interfaces'

export interface IConfig {
  socket: string,
  owner: string,
  [key: string]: any
}

export interface ISub {
  id: string,
  fn: (data: any) => any,
  unsubscribe: () => void
}

export interface ISocket {
  onMessage: (fn: (msg: IReceivedMessage) => any) => ISub,
  onTyping: (fn: (msg: ITyping) => any) => ISub,
  startTyping: () => void,
  stopTyping: () => void,
  sendMessage: (data: ISendMessage) => void
}
