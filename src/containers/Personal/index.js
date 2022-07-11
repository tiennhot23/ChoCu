import React, {Component} from 'react'
import {Image, ScrollView, Text, View} from 'react-native'
import {connect} from 'react-redux'
import {Avatar, withTheme} from 'react-native-paper'

import dynamicStyle from './style'
import {BaseText, Icon} from '@components'
import {dimen} from '@styles'
import RowItem from './components/RowItem'
import {USER_INFO_SCR} from 'src/constants/constant'

class Personal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      themeTag: this.props.theme.tag,
      style: dynamicStyle(this.props.theme)
    }
  }

  static getDerivedStateFromProps(props, current_state) {
    if (current_state.themeTag !== props.theme.tag) {
      return {
        themeTag: props.theme.tag,
        style: dynamicStyle(props.theme)
      }
    }
    return null
  }

  render() {
    return (
      <>
        <View style={this.state.style.header}>
          <View style={this.state.style.headerGroupIcon}>
            {/* <Icon
              name="notifications-outline"
              size={dimen.normalIcon}
              color={'black'}
            /> */}
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={this.state.style.wrapper}>
          <View style={this.state.style.person_container}>
            <Avatar.Image
              source={{
                uri: 'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444'
              }}
              size={70}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                padding: 10
              }}>
              <BaseText
                text="Ten dang nhap"
                style={[this.state.style.bold_text]}
              />
              <BaseText
                text="Xem trang cá nhân"
                style={this.state.style.nor_text}
                onPress={() => this.props.navigation.navigate(USER_INFO_SCR)}
              />
            </View>
          </View>
          <RowItem
            title={'Tieu de'}
            icon={'home-outline'}
            theme={this.props.theme}
          />
        </ScrollView>
      </>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Personal))
