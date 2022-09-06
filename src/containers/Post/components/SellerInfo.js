import {BaseText, Icon} from '@components'
import React, {useEffect, useState} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {Avatar} from 'react-native-paper'
import {Rating} from 'react-native-ratings'
import {baseUrl} from 'src/constants/api'
import {USER_INFO_SCR} from 'src/constants/constant'

export default function SellerInfo({style, user, navigate, isOwner}) {
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
    <View style={style.seller_container}>
      <View style={{flexDirection: 'column'}}>
        <View
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
            <BaseText style={[style.title, {fontSize: 20}]} text={user?.name} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
              <Text style={{color: 'black', padding: 5}}>
                ({stat.rate_count} lượt đánh giá)
              </Text>
            </View>
          </View>
        </View>
      </View>
      {!isOwner && (
        <TouchableOpacity
          onPress={() => navigate(USER_INFO_SCR, {userId: user.user_id})}>
          <Icon name="link-outline" style={style.link_button} />
        </TouchableOpacity>
      )}
    </View>
  )
}
