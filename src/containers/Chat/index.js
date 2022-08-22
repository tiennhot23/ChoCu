import React, {useCallback, useEffect, useState} from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native'
import {useSelector} from 'react-redux'
import database from '@react-native-firebase/database'
import moment from 'moment'
import {helper} from '@common'
import {CHAT_BOX_SCR} from 'src/constants/constant'

const Chat = ({navigation}) => {
  const fromUser = useSelector((state) => state.currentUserReducer.userData)
  const chatsRef = `/chats/${fromUser.user_id}`
  const [messages, setMessages] = useState([])

  useEffect(() => {
    //load old messages
    const loadData = async () => {
      const myChats = await fetchMessages()

      console.log(myChats)
      setMessages(renderMessages(myChats?.messages))
    }

    loadData()

    const onValueChange = database()
      .ref(chatsRef)
      .on('value', (snapshot) => {
        const data = snapshot.val()
        setMessages(renderMessages(data?.messages))
      })

    return () => database().ref(chatsRef).off('value', onValueChange)
  }, [fetchMessages, renderMessages])

  const renderMessages = useCallback((msgs) => {
    return msgs ? Object.keys(msgs).map((key) => msgs[key]) : []
  }, [])

  const fetchMessages = useCallback(async () => {
    return (await database().ref(chatsRef).once('value')).val()
  }, [])

  return (
    <View style={styles.container}>
      <View style={{width: '100%', alignItems: 'center', padding: 15}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Chat History</Text>
      </View>
      {helper.isEmptyArray(messages) ? (
        <Image
          source={{
            uri: 'https://cdn.dribbble.com/users/99954/screenshots/6669081/no_messages_blank_state.png?compress=1&resize=400x300'
          }}
          style={{
            width: '100%',
            height: '80%',
            alignSelf: 'center',
            justifyContent: 'center'
          }}
          resizeMode="contain"
        />
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.createdAt}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate(CHAT_BOX_SCR, {user: item.user})
              }>
              <View style={styles.userInfo}>
                <View style={styles.userImgWrapper}>
                  <Image
                    style={styles.userImg}
                    source={{uri: item.user.avatar}}
                  />
                </View>
                <View style={styles.textSection}>
                  <View style={styles.userInfoText}>
                    <Text style={styles.username}>{item.user.name}</Text>
                    <Text style={styles.postTime}>
                      {moment(item.createdAt).fromNow()}
                    </Text>
                  </View>
                  <Text style={styles.messageText}>{item.text}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  card: {
    width: '100%'
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userImgWrapper: {
    paddingTop: 15,
    paddingBottom: 15
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  userInfoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Lato-Regular'
  },
  postTime: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Lato-Regular'
  },
  messageText: {
    fontSize: 14,
    color: '#333333'
  }
})
