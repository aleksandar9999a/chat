// React
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

// Interfaces
import { IAppConversationEntityProps } from './interfaces'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  title: {
    fontSize: 16,
    fontWeight: '600'
  },
  description: {
    fontSize: 14
  },
  start: {
    width: '80%'
  },
  end: {
    width: '20%',
    textAlign: 'right',
    paddingHorizontal: '5px'
  },
  icon: {
    textAlign: 'right',
    fontSize: 26
  }
})

export default function AppConversationEntity ({ conversation }: IAppConversationEntityProps) {
  return (
    <View style={styles.container}>
      <View style={styles.start}>
        <Text style={styles.title}>
          {conversation.name}
        </Text>

        <Text style={styles.description}>
          {conversation._embedded.lastMessage.text}
        </Text>
      </View>

      <View style={styles.end}>
        <Text style={styles.icon}>{'>'}</Text>
      </View>
    </View>
  )
}
