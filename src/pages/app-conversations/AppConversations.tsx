// React
import React, { useState } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'

// Components
import AppConversationEntity from './../../components/app-conversation-entity/AppConversationEntity'
import AppModal from '../../components/app-modal/AppModal'
import AppConversationForm from './../../components/app-conversation-form/AppConversationForm'

// Interfaces
import { CompositeScreenProps } from '@react-navigation/native'
import { IConversation } from '../../interfaces'


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

const demoEntity = {
  id: 1,
  created: '2020',
  updated: '2021',
  name: 'Pesho',
  _embedded: {
    lastMessage: {
      id: 1,
      text: 'Test',
      created: '2020',
      updated: '2020',
      _embedded: {
        conversation: {} as IConversation,
        recipient: { id: 1, name: 'Alex' },
        owner: { id: 2, name: 'Pesho' }
      }
    },
    owner: { id: 2, name: 'Pesho' }
  }
}

export default function AppConversations ({ navigation }: CompositeScreenProps<any, any>) {
  const [conversations, setConversations] = useState<IConversation[]>([demoEntity])
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function toggleModal () {
    setIsOpen(!isOpen)
  }

  function handlePress (conversation: IConversation) {
    navigation.navigate('Conversation', { conversation })
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
        {conversations.map(x => {
          return (
            <Pressable key={x.id} style={styles.entity} onPress={() => handlePress(x)}>
              <AppConversationEntity conversation={x} />
            </Pressable>
          )
        })}

        {conversations.length <= 0 && <Text style={styles.emptyState}>No conversations!</Text>}
      </View>

      <AppModal isOpen={isOpen}>
        <AppConversationForm onClose={toggleModal} />
      </AppModal>
    </View>
  )
}
