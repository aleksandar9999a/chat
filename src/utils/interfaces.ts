import { IReceivedMessage } from '../interfaces'

export interface IStorageData {
  user: string,
  messages: IReceivedMessage[]
}
