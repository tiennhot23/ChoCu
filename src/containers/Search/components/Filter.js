import {Icon} from '@components'
import React from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'

export default function Filter({style}) {
  return (
    <View style={{padding: 10}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="location-outline"
              size={20}
              color={style.colors.primaryText}
            />
            <Text
              style={{marginHorizontal: 4, color: style.colors.secondaryText}}>
              Khu vực:
            </Text>
            <SelectedBox style={style} title={'Tỉnh/Thành phố'} />
            <SelectedBox style={style} title={'Quận/Huyện'} />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="information-circle-outline"
              size={20}
              color={style.colors.primaryText}
            />
            <Text
              style={{marginHorizontal: 4, color: style.colors.secondaryText}}>
              Chi tiết:
            </Text>
            <SelectedBox style={style} title={'Danh mục'} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const SelectedBox = ({style, title, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        margin: 5,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row'
      }}
      onPress={onPress}>
      <Text style={{marginEnd: 5, color: style.colors.primaryText}}>
        {title}
      </Text>
      <Icon
        name="caret-down-outline"
        size={20}
        color={style.colors.primaryText}
      />
    </TouchableOpacity>
  )
}
