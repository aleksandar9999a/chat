// React
import React from 'react'
import { StyleSheet, View } from 'react-native'

// Interfaces
import { IAppModalProps } from './interfaces'


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: '-92vh',
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .7)'
  },
  content: {
    minWidth: '80vw'
  }
})

export default function AppModal ({ isOpen, children }: IAppModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  )
}
