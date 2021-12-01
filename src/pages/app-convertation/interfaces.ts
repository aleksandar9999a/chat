import { CompositeScreenProps } from '@react-navigation/native'
import { ISocket } from '../../socket/inferfaces'

export interface IAppConversationProps extends CompositeScreenProps<any, any> {
  socket: ISocket
}
