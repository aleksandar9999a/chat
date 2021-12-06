// React
import React, { useState } from 'react'
import { StyleSheet, View, Pressable, Text, ScrollView, TextInput } from 'react-native'

// Interfaces
import { IAppConversationProps } from './interfaces'

// Components
import AppMessage from '../../components/app-message/AppMessage'

// Redux
import { useSelector } from 'react-redux'
import { conversationSelector } from '../../store'


const styles = StyleSheet.create({
  header: {
    height: 50,
    textAlign: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#708090',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerContent: {
    width: '80%'
  },
  headerActions: {
    width: '10%'
  },
  headerText: {
    fontSize: 18
  },
  btn: {
    fontSize: 18
  },
  container: {
    flex: 1
  },
  body: {
    flex: 1
  },
  footer: {
    height: 50,
    borderTopWidth: 1,
    borderTopColor: '#708090',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  footerInputWrapper: {
    width: '90%'
  },
  footerBtnWrapper: {
    width: '10%'
  },
  footerBtn: {
    fontSize: 20,
    textAlign: 'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 6
  },
  entity: {
    marginVertical: 6
  },
  emptyState: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 16
  }
})

export default function AppConversation ({ navigation, route, socket }: IAppConversationProps) {
  const [text, setText] = useState<string>('')

  const messages = useSelector((state: any) => conversationSelector(state, route.params.conversation.name))

  // Don't use reselect to can be reactive
  const isTyping = useSelector((state: any) => {
    return !!Object.entries(state.conversation.typing[route.params.conversation.name] || {}).find(([owner, isTyping]) => isTyping && owner !== socket.configuration.owner)
  })

  function handleChange (text: string) {
    setText(text)
  }

  function handleSubmit () {
    if (!text) {
      return
    }

    socket.sendMessage({ text, recipient: route.params.conversation.name, conversation: route.params.conversation.name })
    setText('')
  }

  function handleBack () {
    navigation.navigate('Home')
  }

  function onFocus () {
    socket.startTyping()
  }

  function onFocusOut () {
    socket.stopTyping()
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerActions}>
          <Pressable onPress={handleBack}>
            <Text style={styles.btn}>{'<'}</Text>
          </Pressable>
        </View>

        <View style={styles.headerContent}>
          <Text style={styles.headerText}>
            {route.params.conversation.name}
          </Text>
        </View>

        <View style={styles.headerActions} />
      </View>

      <ScrollView style={styles.body}>
        {messages.map((x, i) => {
          return (
            <View key={`${i}:${x.owner}`} style={styles.entity}>
              <AppMessage message={x} isLeft={x.owner === socket.configuration.owner}/>
            </View>
          )
        })}
        
        {isTyping && (
          <View style={styles.entity}>
            <AppMessage message={{ text: '...' }} />
          </View>
        )}

        {messages.length <= 0 && !isTyping && <Text style={styles.emptyState}>No messages!</Text>}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerInputWrapper}>
          <TextInput style={styles.input} placeholder="Type here..." value={text} onChangeText={handleChange} onPressIn={onFocus} onPressOut={onFocusOut} />
        </View>

        <View style={styles.footerBtnWrapper}>
          <Pressable onPress={handleSubmit}>
            <Text style={styles.footerBtn}>{'>'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
