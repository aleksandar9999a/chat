// React
import React, { useState } from 'react'
import { StyleSheet, View, Pressable, Text, ScrollView, TextInput } from 'react-native'

// Interfaces
import { CompositeScreenProps } from '@react-navigation/native'
import { IMessage } from '../../interfaces'

// Components
import AppMessage from '../../components/app-message/AppMessage'


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

export default function AppConversation ({ navigation, route }: CompositeScreenProps<any, any>) {
  const [text, setText] = useState<string>('')
  const [messages, setMessages] = useState<IMessage[]>([])
  const [isTyping, setIsTyping] = useState<boolean>(false)

  function handleChange (text: string) {
    setText(text)
  }

  function handleSubmit () {}

  function handleBack () {
    navigation.navigate('Home')
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
        {messages.map(x => {
          return (
            <View key={x.id} style={styles.entity}>
              <AppMessage message={x} />
            </View>
          )
        })}
        
        {isTyping && (
          <View style={styles.entity}>
            <AppMessage message={{ text: '...' }} isLeft />
          </View>
        )}

        {messages.length <= 0 && !isTyping && <Text style={styles.emptyState}>No messages!</Text>}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerInputWrapper}>
          <TextInput style={styles.input} placeholder="Type here..." value={text} onChangeText={handleChange} />
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
