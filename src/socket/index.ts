// Socket
import { io } from 'socket.io-client'

// Utils
import { v4 as uuidv4 } from 'uuid'

// Events
import { CHAT_MESSAGE, TYPING } from '../configs/events'

// Interfaces
import { IConfig, ISub, IMessage } from './inferfaces'


export function connect (config: IConfig) {
  const socket = io(config.socket)
  let messageSubs: ISub[] = []
  let typingSubs: ISub[] = []

  socket.on(CHAT_MESSAGE, ([text, owner]) => {
    messageSubs.forEach(({ fn }) => fn({ text, owner }))
  })

  socket.on(TYPING, ([isTyping, owner]) => {
    typingSubs.forEach(({ fn }) => fn({ isTyping, owner }))
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
    onMessage (fn: (msg: IMessage) => any) {
      const sub = createSub(fn, messageSubs)
      messageSubs.push(sub)
      return sub
    },
    onTyping (fn: (msg: IMessage) => any) {
      const sub = createSub(fn, typingSubs)
      typingSubs.push(sub)
      return sub
    },
    startTyping (user: string) {
      socket.emit(TYPING, [true, user])
    },
    stopTyping (user: string) {
      socket.emit(TYPING, [false, user])
    },
    sendMessage (message: string, recipient: string) {
      socket.emit(CHAT_MESSAGE, [message, recipient])
    }
  }
}
