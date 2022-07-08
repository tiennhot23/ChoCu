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
import {bindActionCreators} from 'redux'

import dynamicStyle from './style'
import {BaseText, Button, Icon} from '@components'
import {dimen} from '@styles'
import {constant} from '@constants'
import {firebase} from '@react-native-firebase/messaging'
import RowItem from './components/RowItem'
import BaseLoading from 'src/components/BaseLoading'
import * as actionNotifyCreator from './action'
import PushNotification from 'react-native-push-notification'

class Notification extends Component {
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

  onDelete = (notifyIndex) => {
    const {actionNotify} = this.props
    actionNotify.delete_notify(notifyIndex)
  }

  onRead = (notifyIndex) => {
    const {actionNotify} = this.props
    actionNotify.mark_notify_as_read(notifyIndex)
  }

  render() {
    const {dataNotify, stateNotify, isLoadMore, stateLoadMore} = this.props
    return (
      <>
        <View style={this.state.style.header}>
          <View style={this.state.style.headerGroupIcon}>
            {/* <Icon
              name="trash-outline"
              size={dimen.normalIcon}
              color={'black'}
            /> */}
          </View>
        </View>
        <BaseLoading
          isLoading={false}
          isError={false}
          isEmpty={false}
          textLoadingError={'loading error from compo notification'}
          onPressTryAgains={() => {}}
          content={
            <FlatList
              showsVerticalScrollIndicator={false}
              style={this.state.style.wrapper}
              data={dataNotify}
              renderItem={({item, index}) => (
                <RowItem
                  item={item}
                  index={index}
                  theme={this.props.theme}
                  onDelete={this.onDelete}
                  onRead={this.onRead}
                />
              )}
              ListFooterComponent={
                <ListFooter
                  isLoadMore={isLoadMore}
                  stateLoadMore={stateLoadMore}
                  style={this.state.style.load_more}
                />
              }
              keyExtractor={(item, index) => `${index}`}
              onEndReachedThreshold={0.5}
              onEndReached={() => {}}
            />
          }
        />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  dataNotify: state.notifyReducer.dataNotify,
  stateNotify: state.notifyReducer.stateNotify,
  isLoadMore: state.notifyReducer.isLoadMore,
  stateLoadMore: state.notifyReducer.stateLoadMore
})

const mapDispatchToProps = (dispatch) => ({
  actionNotify: bindActionCreators(actionNotifyCreator, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(Notification))

const ListFooter = ({isLoadMore, stateLoadMore, style}) => {
  const {isFetching, isError} = stateLoadMore
  return (
    <View style={{margin: 10, alignItems: 'center'}}>
      {isLoadMore ? (
        isFetching ? (
          <ActivityIndicator size={'large'} color={style.color} />
        ) : (
          <TouchableOpacity
            onPress={() => {
              PushNotification.cancelAllLocalNotifications()
              PushNotification.localNotification({
                channelId: 'channel-id',
                title: 'TITLE',
                message: 'MESSAGE'
              })
            }}>
            <BaseText text="Load more" style={style} />
          </TouchableOpacity>
        )
      ) : (
        <BaseText text="End" style={style} />
      )}
    </View>
  )
}
