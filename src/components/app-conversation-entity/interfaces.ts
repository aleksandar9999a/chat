import { IConversation } from '../../interfaces'
import { ISocket } from '../../socket/inferfaces'

export interface IAppConversationEntityProps {
  conversation: IConversation,
  socket: ISocket
}
