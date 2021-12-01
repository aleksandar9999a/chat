// React
import React, { useState } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'

// Components
import AppConversationEntity from './../../components/app-conversation-entity/AppConversationEntity'
import AppModal from '../../components/app-modal/AppModal'
import AppConversationForm from './../../components/app-conversation-form/AppConversationForm'

// Interfaces
import { IAppConversationsProps } from './interfaces'
import { IConversation } from '../../interfaces'

// Redux
import { useSelector } from 'react-redux'
import { conversationsSelector } from '../../store'


const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#708090',
    flex: 1,
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
  entity: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#708090'
  },
  btn: {
    fontSize: 18
  },
  emptyState: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 16
  }
})


export default function AppConversations ({ navigation, socket }: IAppConversationsProps) {
  // const [conversations, setConversations] = useState<IConversation[]>([demoEntity])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const conversations = useSelector(conversationsSelector)

  function toggleModal () {
    setIsOpen(!isOpen)
  }

  function handlePress (conversation: IConversation) {
    navigation.navigate('Conversation', { conversation })
  }

  function handleSubmit (name: string) {
    navigation.navigate('Conversation', { conversation: { name } })
  }

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerActions}/>

        <View style={styles.headerContent}>
          <Text style={styles.headerText}>
            {conversations.length} Conversations
          </Text>
        </View>

        <View style={styles.headerActions}>
          <Pressable onPress={toggleModal}>
            <Text style={styles.btn}>+</Text>
          </Pressable>
        </View>
      </View>

      <View>
        {conversations.map((x, i) => {
          return (
            <Pressable key={`${i}:${x.name}`} style={styles.entity} onPress={() => handlePress(x)}>
              <AppConversationEntity conversation={x} socket={socket} />
            </Pressable>
          )
        })}

        {conversations.length <= 0 && <Text style={styles.emptyState}>No conversations!</Text>}
      </View>

      <AppModal isOpen={isOpen}>
        <AppConversationForm onClose={toggleModal} onSubmit={handleSubmit} />
      </AppModal>
    </View>
  )
}
