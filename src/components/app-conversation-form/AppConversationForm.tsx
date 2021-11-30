// React
import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Pressable, Text } from 'react-native'

// Interfaces
import { IAppConversationForm } from './interfaces'


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  header: {
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  body: {
    padding: 10
  },
  footer: {
    padding: 10
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    width: '80%'
  },
  headerActions: {
    width: '10%'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 6
  },
  btn: {
    fontSize: 14,
    textAlign: 'center'
  }
})

export default function AppConversationForm ({ onClose }: IAppConversationForm) {
  const [text, setText] = useState<string>('')

  function handleChange (text: string) {
    setText(text)
  }

  function handleClose () {
    typeof onClose === 'function' && onClose()
  }

  function handleSave () {}

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerActions} />

        <Text style={styles.headerText}>Name</Text>

        <View style={styles.headerActions}>
          <Pressable onPress={handleClose}>
            <Text style={styles.btn}>X</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.body}>
        <TextInput style={styles.input} placeholder="Type here..." value={text} onChangeText={handleChange} />
      </View>

      <View style={styles.footer}>
        <Pressable onPress={handleSave}>
          <Text style={styles.btn}>
            Start chat
          </Text>
        </Pressable>
      </View>
    </View>
  )
}
