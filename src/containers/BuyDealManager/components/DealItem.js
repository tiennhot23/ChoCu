import moment from 'moment'
import React from 'react'
import {Image, View, Text, TouchableOpacity} from 'react-native'
import {Rating, AirbnbRating} from 'react-native-ratings'

export default function DealItem({
  color = 'black',
  backgroundColor = 'white',
  deal,
  onPress,
  onActionPress
}) {
  return (
    <View
      style={{
        padding: 10,
        flexDirection: 'column'
      }}
      key={deal.deal_id}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}
        onPress={onPress}>
        <Image
          source={{uri: deal.picture[0], width: 70, height: 70}}
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
            {deal.title}
          </Text>
          <Text
            style={{
              color: color
            }}
            ellipsizeMode={'tail'}
            numberOfLines={2}>
            {moment(deal.time_created).fromNow()}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 20,
            fontWeight: '800',
            marginVertical: 5,
            color: 'red'
          }}>
          {deal.deal_price} d
        </Text>
      </TouchableOpacity>
      <View
        style={{
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomColor: color,
          borderBottomWidth: 1,
          borderStyle: 'dotted'
        }}>
        <View
          style={{
            flexDirection: 'column',
            width: 200,
            alignItems: 'flex-start'
          }}>
          <Text numberOfLines={2} style={{color: 'gray'}}>
            {deal.receive_address}
          </Text>
          {['received', 'done'].indexOf(deal.deal_state) >= 0 && (
            <Rating
              type="star"
              startingValue={deal.rate_numb}
              ratingCount={5}
              imageSize={20}
              readonly
              style={{
                marginVertical: 10
              }}
            />
          )}
        </View>
        {deal.deal_state !== 'canceled' && (
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: 150,
              height: 50,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5,
              alignSelf: 'center'
            }}
            disabled={['confirmed'].indexOf(deal.deal_state) >= 0}
            onPress={onActionPress}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              {deal.deal_state === 'pending'
                ? 'Huỷ'
                : deal.deal_state === 'confirmed'
                ? 'Đã xác nhận'
                : deal.deal_state === 'sending'
                ? 'Đã nhận'
                : deal.deal_state === 'received'
                ? 'Đã nhận\n(Chưa đánh giá)'
                : 'Hoàn tất'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
