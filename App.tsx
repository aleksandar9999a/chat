// React
import React from 'react'

// React Routes
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Redux
import { Provider } from 'react-redux'
import store, { addMessage, type } from './src/store'

// Components
import AppConversations from './src/pages/app-conversations/AppConversations'
import AppConversation from './src/pages/app-convertation/AppConversation'

// Config
import config from './src/configs'

// Socket
import { connect } from './src/socket'
import { useEffect } from 'react'

const Stack = createNativeStackNavigator()
const socket = connect(config)


export default function App () {
  useEffect(() => {
    const messageSub = socket.onMessage((message => {
      store.dispatch(addMessage(message))
    }))

    const typingSub = socket.onTyping((data => {
      store.dispatch(type(data))
    }))

    return () => {
      typingSub.unsubscribe()
      messageSub.unsubscribe()
    }
  }, [socket])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home">
            {(props) => <AppConversations {...props} socket={socket} />}
          </Stack.Screen>

          <Stack.Screen name="Conversation">
            {(props) => <AppConversation {...props} socket={socket} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
