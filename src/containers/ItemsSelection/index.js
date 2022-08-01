import {Icon} from '@components'
import React from 'react'
import {
  FlatList,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

export default function ItemsSelection({
  style,
  visible,
  onCancel,
  onApply,
  data,
  title
}) {
  return (
    <Modal visible={visible} animationType="slide">
      <View>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            backgroundColor: style.colors.primaryForeground,
            alignItems: 'center'
          }}>
          <TouchableOpacity onPress={onCancel}>
            <Icon
              name="arrow-back-outline"
              style={{
                fontSize: 24,
                color: style.colors.primaryText,
                paddingEnd: 12
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: style.colors.primaryText,
              padding: 12,
              fontSize: 16,
              fontWeight: '800'
            }}>
            {title}
          </Text>
        </View>
        {/* <ScrollView>
          {data.map((item) => (
            <View style={{}}>
              <Text style={{color: style.colors.primaryText}}>{item}</Text>
            </View>
          ))}
        </ScrollView> */}
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingStart: 10
                }}
                onPress={() => onApply(item)}>
                <Icon
                  name="radio-button-off-outline"
                  size={20}
                  color={style.colors.primaryText}
                />
                <Text
                  style={{
                    color: style.colors.primaryText,
                    padding: 10,
                    fontSize: 16
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </Modal>
  )
}
