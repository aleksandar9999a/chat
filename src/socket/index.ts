// Socket
import { io } from 'socket.io-client'

// Utils
import { v4 as uuidv4 } from 'uuid'

// Events
import { CHAT_MESSAGE, TYPING } from '../configs/events'

// Interfaces
import { IReceivedMessage, ISendMessage, ITyping } from '../interfaces'
import { IConfig, ISub } from './inferfaces'


export function connect (config: IConfig) {
  const socket = io(config.socket)

  let messageSubs: ISub[] = []
  let typingSubs: ISub[] = []

  socket.on(CHAT_MESSAGE, ([text, recipient, owner, conversation, created]) => {
    messageSubs.forEach(({ fn }) => fn({ text, recipient, owner, conversation, created }))
  })

  socket.on(TYPING, ([isTyping, recipient, conversation]) => {
    typingSubs.forEach(({ fn }) => fn({ isTyping, recipient, conversation }))
  })

  function createSub (fn: (data: any) => any, data: ISub[]) {
    const id = uuidv4()

    return {
      id,
      fn,
      unsubscribe () {
        data = data.filter(x => x.id !== id)
      }
    }
  }
  
  return {
    onMessage (fn: (msg: IReceivedMessage) => any) {
      const sub = createSub(fn, messageSubs)
      messageSubs.push(sub)
      return sub
    },
    onTyping (fn: (msg: ITyping) => any) {
      const sub = createSub(fn, typingSubs)
      typingSubs.push(sub)
      return sub
    },
    startTyping () {
      socket.emit(TYPING, [true, config.owner])
    },
    stopTyping () {
      socket.emit(TYPING, [false, config.owner])
    },
    sendMessage ({ text, recipient, conversation }: ISendMessage) {
      socket.emit(CHAT_MESSAGE, [text, recipient, config.owner, conversation])
    }
  }
}
