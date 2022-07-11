import {BaseText, Icon} from '@components'
import React, {Component} from 'react'
import {ScrollView, Text, View} from 'react-native'
import {Avatar} from 'react-native-paper'
import {EDIT_INFO_SCR} from 'src/constants/constant'
import ThemeContext, {ThemeConsumer} from 'src/context/ThemeContext'
import PostContainer from './components/PostContainer'
import dynamicStyle from './style'

export default class UserInfo extends Component {
  static contextType = ThemeContext

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <ThemeConsumer>
        {(theme) => {
          const style = dynamicStyle(theme)
          return (
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
                <View style={style.posts_container}>
                  <BaseText text="Ten dang nhap" style={[style.bold_text]} />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around'
                    }}>
                    <BaseText
                      text={`${0} Người theo dõi`}
                      style={style.nor_text}
                      onPress={() => {}}
                    />
                    <BaseText
                      text={`${0} Đang theo dõi`}
                      style={style.nor_text}
                      onPress={() => {}}
                    />
                  </View>
                  <BaseText
                    text="Chỉnh sửa thông tin cá nhân"
                    style={[style.nor_text, style.thin_border]}
                    onPress={() => {
                      this.props.navigation.navigate(EDIT_INFO_SCR)
                    }}
                  />
                </View>
              </View>
              <View style={style.detail_container}>
                <View style={style.detail_item}>
                  <View
                    style={{
                      backgroundColor: '#57f542',
                      borderRadius: 20,
                      width: 18,
                      height: 18,
                      marginLeft: 9,
                      marginRight: 5
                    }}
                  />
                  <BaseText
                    text={`Trạng thái: Đang hoạt động`}
                    style={style.nor_text}
                  />
                </View>
                <View style={style.detail_item}>
                  <Icon name="star-outline" size={20} style={style.nor_text} />
                  <BaseText
                    text={`Đánh giá: Chưa có đánh giá`}
                    style={style.nor_text}
                  />
                </View>
                <View style={style.detail_item}>
                  <Icon
                    name="location-outline"
                    size={20}
                    style={style.nor_text}
                  />
                  <BaseText
                    text={`Địa chỉ: Chưa cung cấp`}
                    style={style.nor_text}
                  />
                </View>
                <View style={style.detail_item}>
                  <Icon name="call-outline" size={20} style={style.nor_text} />
                  <BaseText
                    text={`Số điện thoại: *******874`}
                    style={style.nor_text}
                  />
                </View>
              </View>
              <PostContainer title={'Tin đang duyệt'} style={style} />
              <PostContainer title={'Tin đang đăng'} style={style} />
              <PostContainer title={'Tin đã hết'} style={style} />
            </ScrollView>
          )
        }}
      </ThemeConsumer>
    )
  }
}
