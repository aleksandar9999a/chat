export interface IConfig {
  socket: string,
  [key: string]: any
}

export interface IMessage {
  owner: string,
  text: string
}

export interface ISub {
  id: string,
  fn: (data: any) => any,
  unsubscribe: () => void
}