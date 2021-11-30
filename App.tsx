// React
import React from 'react'
import { StyleSheet, View } from 'react-native'

// React Routes
import { NativeRouter, Routes, Route } from 'react-router-native'

// Components
import AppConversations from './src/pages/app-conversations/AppConversations'
import AppConversation from './src/pages/app-convertation/AppConversation'


export default function App () {
  return (
    <NativeRouter>
      <View>
        <Routes>
          <Route path="/" element={<AppConversations />} />

          <Route path="/convertation/:id" element={<AppConversation />} />
        </Routes>
      </View>
    </NativeRouter>
  )
}
