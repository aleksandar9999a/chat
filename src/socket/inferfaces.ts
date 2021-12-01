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