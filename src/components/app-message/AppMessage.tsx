// React
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

// Interfaces
import { IAppMessageProps } from './interfaces'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8
  },
  justifyEnd: {
    justifyContent: 'flex-end'
  },
  justifyStart: {
    justifyContent: 'flex-start'
  },
  content: {
    borderRadius: 8,
    padding: 6,
    borderWidth: 1,
    borderColor: '#000',
    maxWidth: '70%',
    minWidth: '30%'
  }
})

export default function AppMessage ({ message, isLeft }: IAppMessageProps) {
  return (
    <View style={[styles.container, isLeft ? styles.justifyStart : styles.justifyEnd]}>
      <View style={styles.content}>
        <Text>{message.text}</Text>
      </View>
    </View>
  )
}
