import React, {useState, useEffect, useCallback} from 'react'
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native'
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import database from '@react-native-firebase/database'
import {useSelector} from 'react-redux'

const ChatBox = ({route, navigation, ...props}) => {
  const toUser = route.params.user
  const fromUser = useSelector((state) => state.currentUserReducer.userData)
  const chatBoxRef = `/chatbox/${
    toUser.user_id < fromUser.user_id
      ? toUser.user_id + '+' + fromUser.user_id
      : fromUser.user_id + '+' + toUser.user_id
  }`
  const [messages, setMessages] = useState([])

  useEffect(() => {
    navigation.setOptions({title: toUser.name})
  }, [])

  useEffect(() => {
    //load old messages
    const loadData = async () => {
      const myChatroom = await fetchMessages()
      console.log(chatBoxRef)

      setMessages(renderMessages(myChatroom?.messages))
    }

    loadData()

    const onValueChange = database()
      .ref(chatBoxRef)
      .on('value', (snapshot) => {
        const data = snapshot.val()
        setMessages(renderMessages(data?.messages))
      })

    return () => database().ref(chatBoxRef).off('value', onValueChange)
  }, [fetchMessages, renderMessages])

  const renderMessages = useCallback((msgs) => {
    return msgs ? msgs.reverse() : []
  }, [])

  const fetchMessages = useCallback(async () => {
    return (await database().ref(chatBoxRef).once('value')).val()
  }, [])

  const onSend = useCallback(
    async (msg = []) => {
      //send the msg[0] to the other user

      //fetch fresh messages from server
      const currentChatroom = await fetchMessages()

      const lastMessages = currentChatroom?.messages || []

      database()
        .ref(chatBoxRef)
        .update({
          messages: [
            ...lastMessages,
            {
              _id: lastMessages.length,
              text: msg[0].text,
              createdAt: new Date().getTime(),
              user: {
                _id: fromUser.user_id,
                name: fromUser.name,
                avatar: fromUser.avatar
              }
            }
          ]
        })
        .then(() => console.log('Messages updated.'))

      database()
        .ref(`/chats/${fromUser.user_id}/messages/${toUser.user_id}`)
        .update({
          text: 'You: ' + msg[0].text,
          createdAt: new Date().getTime(),
          user: {
            user_id: toUser.user_id,
            name: toUser.name,
            avatar: toUser.avatar
          }
        })
        .then(() => console.log('Messages updated.'))

      database()
        .ref(`/chats/${toUser.user_id}/messages/${fromUser.user_id}`)
        .update({
          text: msg[0].text,
          createdAt: new Date().getTime(),
          user: {
            user_id: fromUser.user_id,
            name: fromUser.name,
            avatar: fromUser.avatar
          }
        })
        .then(() => console.log('Messages updated.'))

      setMessages((prevMessages) => GiftedChat.append(prevMessages, msg))
    },
    [fetchMessages]
  )

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#000"
          />
        </View>
      </Send>
    )
  }

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'black'
          },
          left: {
            backgroundColor: '#eee'
          }
        }}
        textStyle={{
          right: {
            color: '#fff'
          },
          left: {
            color: 'black'
          }
        }}
      />
    )
  }

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: fromUser.user_id
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  )
}

export default ChatBox

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
