// React
import React from 'react'

// React Routes
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Components
import AppConversations from './src/pages/app-conversations/AppConversations'
import AppConversation from './src/pages/app-convertation/AppConversation'

// Config
import config from './src/configs'

// Socket
import { connect } from './src/socket'

const Stack = createNativeStackNavigator()

connect(config)

export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={AppConversations} />

        <Stack.Screen name="Conversation" component={AppConversation} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
