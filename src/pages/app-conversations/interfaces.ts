import { CompositeScreenProps } from '@react-navigation/native'
import { ISocket } from '../../socket/inferfaces'

export interface IAppConversationsProps extends CompositeScreenProps<any, any> {
  socket: ISocket
}