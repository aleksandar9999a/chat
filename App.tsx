// React
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'

// React Routes
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Redux
import { Provider } from 'react-redux'
import store, { addMessage, initMessages, type } from './src/store'

// Components
import AppConversations from './src/pages/app-conversations/AppConversations'
import AppConversation from './src/pages/app-convertation/AppConversation'

// Config
import config from './src/configs'

// Socket
import { connect } from './src/socket'

// Utils
import { loadStorageData, setMessages } from './src/utils'

const Stack = createNativeStackNavigator()
const socket = connect(config)

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
    color: '#FF2D00',
    fontWeight: '700',
    padding: 10
  }
})

export default function App () {
  const [error, setError] = useState<string>('')

  useEffect(() => {
    loadStorageData().then(({ user, messages }) => {
      socket.setUser(user)
      store.dispatch(initMessages(messages))
    }).catch((err: Error) => {
      setError(err.message)
    })

    const messageSub = socket.onMessage((message => {
      store.dispatch(addMessage(message))

      setMessages(store.getState().conversation.items).catch((err: Error) => {
        setError(err.message)
      })
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
      {error && <Text style={styles.error}>{error}</Text>}

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
