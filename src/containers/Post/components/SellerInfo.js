import {BaseText, Icon} from '@components'
import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {Avatar} from 'react-native-paper'
import {USER_INFO_SCR} from 'src/constants/constant'

export default function SellerInfo({style, user, navigate, isOwner}) {
  return (
    <View style={style.seller_container}>
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
          <BaseText style={style.small_text} text={'Trạng thái hoạt động'} />
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
