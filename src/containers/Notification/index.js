import React, {Component} from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {connect} from 'react-redux'
import {Avatar, withTheme} from 'react-native-paper'

import dynamicStyle from './style'
import {BaseText, Button, Icon} from '@components'
import {dimen} from '@styles'
import {constant} from '@constants'
import {firebase} from '@react-native-firebase/messaging'
import RowItem from './components/RowItem'

class Notification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      themeTag: this.props.theme.tag,
      style: dynamicStyle(this.props.theme),
      data: [
        {
          id: 1,
          title: 'a',
          content: 'Đây là một thông báo dài dài dài dài dài dài dài dài dài',
          time: 1657175634417,
          image:
            'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
          isRead: false
        }
      ]
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
        <FlatList
          showsVerticalScrollIndicator={false}
          style={this.state.style.wrapper}
          data={this.state.data}
          renderItem={(data) => (
            <RowItem
              title={data.item.title}
              content={data.item.content}
              image={data.item.image}
              time={data.item.time}
              theme={this.props.theme}
              isRead={data.item.isRead}
            />
          )}
          ListFooterComponent={() => {
            return (
              <View style={{margin: 10, alignItems: 'center'}}>
                {false ? (
                  <ActivityIndicator size={'large'} />
                ) : (
                  <TouchableOpacity>
                    <BaseText
                      text="Load more"
                      style={this.state.style.load_more}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )
          }}
          keyExtractor={(item) => item.id}
        />
      </>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(Notification))
