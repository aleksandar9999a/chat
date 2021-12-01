// React
import React, { useEffect, useState } from 'react'
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
    paddingHorizontal: '5px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  icon: {
    textAlign: 'right',
    fontSize: 26
  },
  badge: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginRight: 10
  }
})

export default function AppConversationEntity ({ conversation, socket }: IAppConversationEntityProps) {
  const [unreaded, setUnreaded] = useState<number>(0)

  useEffect(() => {
    const sub = socket.onMessage((data) => {
      if (data.conversation === conversation.name) {
        setUnreaded(unreaded + 1)
      }
    })

    return () => {
      sub.unsubscribe()
    }
  }, [socket])

  return (
    <View style={styles.container}>
      <View style={styles.start}>
        <Text style={styles.title}>
          {conversation.name}
        </Text>

        <Text style={styles.description}>
          {conversation.lastMessage}
        </Text>
      </View>

      <View style={styles.end}>
        {unreaded > 0 && (
          <View style={styles.badge}>
            <Text>{unreaded}</Text>
          </View>
        )}
        <Text style={styles.icon}>{'>'}</Text>
      </View>
    </View>
  )
}
