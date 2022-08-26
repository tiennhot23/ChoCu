import {BaseText, Icon} from '@components'
import {font} from '@styles'
import React, {useCallback, useEffect, useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Avatar} from 'react-native-paper'
import {Rating} from 'react-native-ratings'
import {useDispatch, useSelector} from 'react-redux'
import database from '@react-native-firebase/database'
import {baseUrl} from 'src/constants/api'
import {AUTH_NAV, CHAT_BOX_SCR} from 'src/constants/constant'

export default Info = ({
  color = 'black',
  backgroundColor = 'white',
  width = '90%',
  navigate
}) => {
  const user = useSelector((state) => state.userInfoReducer?.userData)
  const isLoggedIn = useSelector((state) => state.currentUserReducer.isLoggedIn)
  const dispatch = useDispatch()
  const [follows, setFollows] = useState({
    user_follower: 0,
    user_following: 0
  })
  const [status, setStatus] = useState(false)

  useEffect(() => {
    // dispatch(requestUserData())
    fetch(baseUrl + '/user/user-follow' + `/${user.user_id}`)
      .then((res) => res.json())
      .then((res) => {
        setFollows(res.data[0])
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    const loadData = async () => {
      const mUser = await fetchUser()

      setStatus(mUser?.isOnline)
    }

    loadData()

    const onValueChange = database()
      .ref(`/users/${user.user_id}`)
      .on('value', (snapshot) => {
        const mUser = snapshot.val()
        setStatus(mUser?.isOnline)
      })

    return () =>
      database().ref(`/users/${user.user_id}`).off('value', onValueChange)
  }, [fetchUser])

  const fetchUser = useCallback(async () => {
    return (await database().ref(`/users/${user.user_id}`).once('value')).val()
  }, [])

  return (
    <>
      <View style={style.person_container}>
        <Avatar.Image
          source={{
            uri: user?.avatar
          }}
          size={80}
          style={{alignSelf: 'center'}}
        />
        <View style={style.posts_container}>
          <BaseText text={user?.name} style={[style.bold_text]} />
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}>
            <BaseText
              text={`${follows.user_follower} Người theo dõi`}
              style={style.nor_text}
              onPress={() => {}}
            />
            <BaseText
              text={`${follows.user_following} Đang theo dõi`}
              style={style.nor_text}
              onPress={() => {}}
            />
          </View> */}
        </View>
      </View>
      <View style={style.detail_container}>
        <View style={style.detail_item}>
          <View
            style={{
              backgroundColor: status ? '#57f542' : 'gray', // '#57f542',
              borderRadius: 20,
              width: 18,
              height: 18,
              marginLeft: 9,
              marginRight: 5
            }}
          />
          <BaseText text={`Trạng thái: `} style={style.bold_text} />
          <BaseText
            text={`${
              status && user?.active ? 'Đang hoạt động' : 'Chưa hoạt động'
            }`}
            style={style.nor_text}
          />
        </View>
        <View style={style.detail_item}>
          <Icon name="star-outline" size={20} style={style.nor_text} />
          <BaseText text={`Đánh giá: `} style={style.bold_text} />
          <Rating
            type="star"
            startingValue={user?.rating}
            ratingCount={5}
            imageSize={20}
            readonly
            style={{
              marginVertical: 10
            }}
          />
        </View>
        <View style={style.detail_item}>
          <Icon name="location-outline" size={20} style={style.nor_text} />
          <BaseText text={`Địa chỉ: `} style={style.bold_text} />
          <BaseText text={user?.address} style={style.nor_text} />
        </View>
        <View style={style.detail_item}>
          <Icon name="call-outline" size={20} style={style.nor_text} />
          <BaseText text={`Số điện thoại: `} style={style.bold_text} />
          <BaseText text={user?.phone} style={style.nor_text} />
        </View>

        <View style={style.detail_item}>
          <Icon name="mail-outline" size={20} style={style.nor_text} />
          <BaseText text={`Email: `} style={style.bold_text} />
          <BaseText text={user?.email} style={style.nor_text} />
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 10,
            backgroundColor: 'white'
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              flex: 1,
              height: '100%',
              borderColor: color,
              borderWidth: 2,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5
            }}
            onPress={() => {
              if (isLoggedIn) navigate(CHAT_BOX_SCR, {user})
              else navigate(AUTH_NAV)
            }}>
            <Icon name="chatbox-ellipses-outline" size={20} color={color} />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontWeight: '800',
                letterSpacing: 1,
                marginLeft: 5,
                color: color,
                textTransform: 'uppercase'
              }}>
              {'Chat'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const style = StyleSheet.create({
  wrapper: {
    padding: 5,
    backgroundColor: 'white'
  },
  person_container: {
    backgroundColor: 'white',
    padding: 5,
    borderBottomWidth: 0.7,
    borderBottomColor: 'black',
    flex: 1,
    flexDirection: 'row'
  },
  detail_container: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    borderBottomWidth: 0.5,
    borderBottomColor: 'black'
  },
  posts_container: {
    marginVertical: 10,
    backgroundColor: 'white',
    padding: 5,
    flex: 1,
    flexDirection: 'column'
  },
  bold_text: {
    fontSize: font.FONT_SIZE_16,
    color: 'black',
    marginLeft: 4,
    fontWeight: 'bold',
    padding: 5
  },
  nor_text: {
    color: 'black',
    marginLeft: 4,
    padding: 5
  },
  thin_border: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    margin: 5,
    padding: 10,
    alignSelf: 'flex-start'
  },
  detail_item: {flexDirection: 'row', alignItems: 'center'}
})
