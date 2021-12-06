// Utils
import AsyncStorage from '@react-native-async-storage/async-storage'
import { v4 as uuidv4 } from 'uuid'

// Config
import { MESSAGES, USER } from '../configs/storage'

// Interfaces
import { IReceivedMessage } from '../interfaces'
import { IStorageData } from './interfaces'


function getUser (user: string|null): string {
  if (!user) {
    const newUser = uuidv4()

    // We automatically save new user as a side effect
    AsyncStorage.setItem(USER, newUser)

    return newUser
  }

  return user
}

function getMessages (messages: string|null): IReceivedMessage[] {
  if (messages) {
    return JSON.parse(messages)
  }

  return []
}

export function setMessages (messages: IReceivedMessage[]) {
  return AsyncStorage.setItem(MESSAGES, JSON.stringify(messages))
}

export function loadStorageData (): Promise<IStorageData> {
  const keys = [USER, MESSAGES]

  return Promise.all(keys.map(x => AsyncStorage.getItem(x)))
    .then(([user, messages]) => {
      return {
        user: getUser(user),
        messages: getMessages(messages)
      }
    })
}
