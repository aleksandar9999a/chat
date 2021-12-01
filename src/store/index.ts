// Redux
import { createStore, combineReducers } from 'redux'
import { createSelector } from 'reselect'

// Interfaces
import { IConversation, IReceivedMessage, ITyping } from '../interfaces'
import { IStore } from './interfaces'


const initialState: IStore = {
  items: [],
  typing: {}
}

function reducer (state = initialState, action: { type: string, payload: IReceivedMessage|ITyping }) {
  const actions: { [key: string]: () => typeof state } = {
    type () {
      const update = {
        ...state
      }

      if (!update.typing[action.payload.conversation]) {
        update.typing[action.payload.conversation] = {}
      }

      update.typing[action.payload.conversation][action.payload.recipient] = (action.payload as ITyping).isTyping

      return update
    },
    add () {
      return {
        ...state,
        items: [...state.items, action.payload as IReceivedMessage]
      }
    }
  }

  if (typeof actions[action.type] === 'function') {
    return actions[action.type]()
  }

  return state
}

export function addMessage (payload: IReceivedMessage) {
  return { type: 'add', payload }
}

export function type (payload: ITyping) {
  return { type: 'type', payload }
}

const store = createStore(combineReducers({
  conversation: reducer
}))

export const conversationSelector = createSelector(
  (state: { conversation: IStore }) => state.conversation.items,
  (_: any, conversation: string) => conversation,
  (items, conversation: string) => items.filter(x => x.conversation === conversation)
)

export const conversationsSelector = createSelector(
  (state: { conversation: IStore }) => state.conversation.items,
  (_: any) => _,
  (items) => Object.values(items.reduce((acc: { [key: string]: IConversation}, message) => {
    if (!acc[message.conversation]) {
      acc[message.conversation] = {
        name: message.conversation,
        lastMessage: ''
      }
    }

    acc[message.conversation].lastMessage = message.text
    return acc
  }, {}))
)

export default store

