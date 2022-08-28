import {helper} from '@common'
import {Icon} from '@components'
import {constant} from '@constants'
import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {View, TouchableOpacity, Image, FlatList, Text} from 'react-native'
import {Avatar, Searchbar} from 'react-native-paper'
import {useDispatch, useSelector} from 'react-redux'
import {baseUrl} from 'src/constants/api'
import {POST_SCR, USER_INFO_SCR} from 'src/constants/constant'
import {requestAllUsers, requestPendingPosts, requestReports} from './action'

export default function AdminAccountManager({
  route,
  navigation,
  color = 'black',
  backgroundColor = 'white',
  ...props
}) {
  const users = useSelector(
    (state) => state.adminAccountManagerReducer.usersData
  )
  const [data, setData] = useState([])
  const [dataHolder, setDataHolder] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestAllUsers())
  }, [])

  useEffect(() => {
    if (users) {
      let a = users?.sort((a, b) => {
        return a.active === b.active ? 0 : a.active ? -1 : 1
      })
      a = a.map((e) => ({
        ...e,
        keyword:
          helper.removeAccent(e.name).toLowerCase() +
          ' ' +
          e.phone +
          ' ' +
          e.email
      }))
      setData(a)
      setDataHolder(a)
    }
  }, [users])

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Searchbar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={(text) => {
          const newData = data.filter((item) => {
            const itemData = `${item.keyword}`
            const textData = helper.removeAccent(text).toLowerCase()

            return itemData.indexOf(textData) > -1
          })
          setDataHolder(newData)
        }}
        autoCorrect={false}
      />
      <FlatList
        data={dataHolder}
        showsVerticalScrollIndicator={false}
        overScrollMode={'never'}
        renderItem={({item, index}) => (
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingStart: 10,
              flexDirection: 'row',
              alignItems: 'center'
            }}
            key={item.user_id}
            onPress={() =>
              navigation.navigate(USER_INFO_SCR, {userId: item.user_id})
            }>
            <Avatar.Image
              source={{uri: item.avatar, width: 70, height: 70}}
              style={{aspectRatio: 1, margin: 5}}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                padding: 5,
                justifyContent: 'center'
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: color
                }}
                ellipsizeMode={'tail'}
                numberOfLines={2}>
                {item.name}
              </Text>
              <Text
                style={{
                  color: color
                }}
                ellipsizeMode={'tail'}
                numberOfLines={2}>
                {item.phone}
              </Text>
              <Text
                style={{
                  color: color
                }}
                ellipsizeMode={'tail'}
                numberOfLines={2}>
                {item.email}
              </Text>
            </View>

            <View
              style={{
                width: 70,
                height: 70,
                justifyContent: 'center'
              }}>
              <Icon
                name={
                  item.active
                    ? 'checkmark-circle-outline'
                    : 'close-circle-outline'
                }
                color={item.active ? 'green' : 'red'}
                size={constant.normalIcon}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
