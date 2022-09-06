import {BaseText, Icon} from '@components'
import React from 'react'
import {useEffect} from 'react'
import {useState} from 'react'
import {TouchableOpacity, View, Text} from 'react-native'
import {Avatar} from 'react-native-paper'
import {Rating} from 'react-native-ratings'
import {baseUrl} from 'src/constants/api'
import {CHAT_BOX_SCR, USER_INFO_SCR} from 'src/constants/constant'

export default function UserInfo({
  color = 'black',
  backgroundColor = 'white',
  width = '90%',
  user,
  isBuyer,
  navigate
}) {
  const [stat, setStat] = useState({
    rating: 0,
    rate_count: 0,
    success_sell_deal_count: 0,
    success_buy_deal_count: 1,
    denied_buy_deal_count: 1
  })

  useEffect(() => {
    fetch(baseUrl + `/user/user-deal-stat/${user?.user_id}`)
      .then((res) => res.json())
      .then((res) => setStat(res.data[0]))
      .catch((err) => alert(res.message))
  }, [])
  return (
    <>
      <View
        style={{
          width,
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
          justifyContent: 'space-between',
          borderBottomColor: color,
          borderBottomWidth: 1,
          borderStyle: 'dashed',
          paddingBottom: 10
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigate(USER_INFO_SCR, {userId: user?.user_id})}
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <Avatar.Image
            source={{
              uri: user?.avatar
            }}
            size={50}
            style={{alignSelf: 'center'}}
          />
          <View style={{marginStart: 10}}>
            <BaseText
              style={[
                {
                  fontSize: 24,
                  fontWeight: '800',
                  letterSpacing: 0.5,
                  marginVertical: 4,
                  color: 'gray',
                  marginEnd: 30
                },
                {fontSize: 20}
              ]}
              text={user?.name}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate(CHAT_BOX_SCR, {user})}>
          <Icon
            name="chatbox-outline"
            style={{
              fontSize: 24,
              color: color,
              backgroundColor: color + 20,
              padding: 8,
              borderRadius: 100
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', width}}>
        <Text
          style={{
            fontSize: 14,
            letterSpacing: 0.5,
            marginVertical: 4,
            marginEnd: 10,
            color: color
          }}
          ellipsizeMode={'tail'}>
          {'Số điện thoại:'}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            letterSpacing: 0.5,
            marginVertical: 4,
            color
          }}
          ellipsizeMode={'tail'}>
          {user?.phone}
        </Text>
      </View>
      <View style={{flexDirection: 'row', width}}>
        <Text
          style={{
            fontSize: 14,
            letterSpacing: 0.5,
            marginVertical: 4,
            marginEnd: 10,
            color: color
          }}
          ellipsizeMode={'tail'}>
          {'Email:'}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            letterSpacing: 0.5,
            marginVertical: 4,
            color
          }}
          ellipsizeMode={'tail'}>
          {user?.email}
        </Text>
      </View>
      <View style={{flexDirection: 'row', width}}>
        <Text
          style={{
            fontSize: 14,
            letterSpacing: 0.5,
            marginVertical: 4,
            marginEnd: 10,
            color: color
          }}
          ellipsizeMode={'tail'}>
          {'Địa chỉ:'}
        </Text>
        <Text
          style={{
            flex: 1,
            fontSize: 14,
            fontWeight: '500',
            letterSpacing: 0.5,
            marginVertical: 4,
            color
          }}
          ellipsizeMode={'tail'}>
          {user?.address}
        </Text>
      </View>
      <View style={{flexDirection: 'row', width}}>
        <Text
          style={{
            fontSize: 14,
            letterSpacing: 0.5,
            marginVertical: 4,
            marginEnd: 10,
            color: color
          }}
          ellipsizeMode={'tail'}>
          {'Đánh giá:'}
        </Text>
        <Rating
          type="star"
          startingValue={stat?.rating}
          ratingCount={5}
          imageSize={20}
          readonly
          style={{}}
        />
        <Text
          style={{
            fontSize: 14,
            letterSpacing: 0.5,
            marginVertical: 4,
            marginEnd: 10,
            color: color
          }}
          ellipsizeMode={'tail'}>
          ({stat?.rate_count} lượt đánh giá)
        </Text>
      </View>
      <View style={{flexDirection: 'row', width}}>
        <Text
          style={{
            fontSize: 14,
            letterSpacing: 0.5,
            marginVertical: 4,
            marginEnd: 10,
            color: color
          }}
          ellipsizeMode={'tail'}>
          {isBuyer ? 'Giao dịch mua thành công:' : 'Giao dịch bán thành công:'}
        </Text>
        <Text
          style={{
            fontSize: 14,
            letterSpacing: 0.5,
            marginVertical: 4,
            marginEnd: 10,
            color: color
          }}
          ellipsizeMode={'tail'}>
          {isBuyer
            ? stat?.success_buy_deal_count
            : stat?.success_sell_deal_count}{' '}
          lần
        </Text>
      </View>
    </>
  )
}
