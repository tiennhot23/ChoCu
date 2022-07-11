import {BaseText, Button, Icon} from '@components'
import React, {Component} from 'react'
import {ScrollView, View} from 'react-native'
import {Avatar} from 'react-native-paper'
import BaseButton from 'src/components/BaseButton'
import ThemeContext, {ThemeConsumer} from 'src/context/ThemeContext'
import Input from './components/Input'
import RowItem from './components/RowItem'
import dynamicStyle from './style'

export default class EditInfo extends Component {
  render() {
    return (
      <ThemeConsumer>
        {(theme) => {
          const style = dynamicStyle(theme)
          return (
            <>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={style.wrapper}>
                <View style={style.person_container}>
                  <Avatar.Image
                    source={{
                      uri: 'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444'
                    }}
                    size={80}
                    style={{alignSelf: 'center'}}
                  />
                  <Icon
                    style={style.camera}
                    name={'camera-outline'}
                    size={28}
                  />
                  <Input style={style} title={'Họ và tên'} />
                </View>
                <View style={style.list_container}>
                  <RowItem
                    style={style}
                    title={'Số điện thoại'}
                    content={'0703122874'}
                  />
                  <RowItem
                    style={style}
                    title={'Địa chỉ'}
                    content={'97 Man Thiện'}
                  />
                </View>
              </ScrollView>
              <BaseButton
                iconLeft={{name: 'save-outline', size: 20}}
                text={'Lưu thay đổi'}
                styleText={[style.bold_text, {fontSize: 16}]}
                styleContainer={style.absolute_button}
              />
            </>
          )
        }}
      </ThemeConsumer>
    )
  }
}
