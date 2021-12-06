import { IReceivedMessage, ISendMessage, ITyping } from '../interfaces'

export interface IConfig {
  socket: string,
  [key: string]: any
}

export interface ISub {
  id: string,
  fn: (data: any) => any,
  unsubscribe: () => void
}

export interface ISocket {
  configuration: {
    socket: string,
    owner: string
  }
  setUser: (user: string) => void,
  onMessage: (fn: (msg: IReceivedMessage) => any) => ISub,
  onTyping: (fn: (msg: ITyping) => any) => ISub,
  startTyping: () => void,
  stopTyping: () => void,
  sendMessage: (data: ISendMessage) => void
}
