import {BaseText, Icon} from '@components'
import {constant} from '@constants'
import {font} from '@styles'
import React, {useEffect, useState} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {Avatar} from 'react-native-paper'
import {Rating} from 'react-native-ratings'
import {useDispatch, useSelector} from 'react-redux'
import {getItem} from 'src/common/storage'
import {baseUrl} from 'src/constants/api'
import {EDIT_INFO_SCR, USER_INFO_SCR} from 'src/constants/constant'
import {CURRENT_USER} from 'src/constants/storage'
import {requestUserData} from 'src/containers/CurrentUser/action'

export default Header = ({
  color = 'black',
  backgroundColor = 'white',
  width = '90%',
  navigate
}) => {
  const user = useSelector((state) => state.currentUserReducer?.userData)
  const dispatch = useDispatch()
  const [follows, setFollows] = useState({
    user_follower: 0,
    user_following: 0
  })

  useEffect(() => {
    dispatch(requestUserData())
    fetch(baseUrl + '/user/user-follow' + `/${user.user_id}`)
      .then((res) => res.json())
      .then((res) => {
        setFollows(res.data[0])
      })
      .catch((err) => console.log(err))
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
          <BaseText
            text="Chỉnh sửa thông tin cá nhân"
            style={[style.nor_text, style.thin_border]}
            onPress={() => {
              navigate(EDIT_INFO_SCR)
            }}
          />
        </View>
      </View>
      <View style={style.detail_container}>
        <View style={style.detail_item}>
          <View
            style={{
              backgroundColor: '#57f542', // '#57f542',
              borderRadius: 20,
              width: 18,
              height: 18,
              marginLeft: 9,
              marginRight: 5
            }}
          />
          <BaseText text={`Trạng thái: `} style={style.bold_text} />
          <BaseText text={`Đang hoạt động`} style={style.nor_text} />
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
          <BaseText text={user?.address} style={[style.nor_text, {flex: 1}]} />
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
        <View style={style.detail_item}>
          <Icon name="pencil-outline" size={20} style={style.nor_text} />
          <BaseText text={`Lượt đăng bài: `} style={style.bold_text} />
          <BaseText text={user?.post_turn} style={style.nor_text} />
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
