import { IReceivedMessage } from "../interfaces";

export interface IStore {
  items: IReceivedMessage[],
  typing: {
    [key: string]: {
      [key: string]: boolean
    }
  }
}