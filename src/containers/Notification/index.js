import React, {Component, useEffect} from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {connect, useDispatch, useSelector} from 'react-redux'
import {Avatar, withTheme} from 'react-native-paper'
import {bindActionCreators} from 'redux'

import {BaseText, Button, Icon} from '@components'
import {dimen, font} from '@styles'
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
      theme: this.props.route.params
    }
  }

  componentDidMount() {
    const {actionNotify} = this.props
    actionNotify.getDataNotification()
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
    const {theme} = this.state
    const {navigate} = this.props.navigation
    const style = initStyle(theme)
    const {dataNotify, stateNotify, isLoadMore, stateLoadMore} = this.props

    return (
      <>
        <BaseLoading
          isLoading={false}
          isError={false}
          isEmpty={false}
          textLoadingError={'loading error from compo notification'}
          onPressTryAgains={() => {}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={style.wrapper}
            data={dataNotify}
            renderItem={({item, index}) => (
              <RowItem
                item={item}
                index={index}
                theme={theme}
                onDelete={this.onDelete}
                onRead={this.onRead}
              />
            )}
            ListFooterComponent={
              <ListFooter
                isLoadMore={isLoadMore}
                stateLoadMore={stateLoadMore}
                style={style.load_more}
              />
            }
            keyExtractor={(item, index) => item.time_created}
            onEndReachedThreshold={0.5}
            onEndReached={() => {}}
          />
        </BaseLoading>
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

export default connect(mapStateToProps, mapDispatchToProps)(Notification)

const initStyle = (theme) => {
  return StyleSheet.create({
    header: {
      backgroundColor: theme.primaryForeground,
      height: constant.calcHeight(dimen.headerHeight),
      justifyContent: 'center'
    },
    headerIcon: {},
    headerGroupIcon: {
      alignSelf: 'flex-end',
      marginEnd: constant.calcWidth(10)
    },
    wrapper: {
      padding: constant.calcWidth(5),
      backgroundColor: theme.primaryBackground
    },
    person_container: {
      padding: constant.calcWidth(10),
      borderBottomWidth: 0.7,
      borderBottomColor: theme.primaryForeground,
      flex: 1,
      flexDirection: 'row'
    },
    bold_text: {
      fontSize: font.FONT_SIZE_16,
      color: theme.primaryText,
      marginLeft: 4,
      fontWeight: 'bold'
    },
    nor_text: {
      color: theme.secondaryText,
      marginLeft: 4
    },
    load_more: {
      color: theme.primaryForeground
    }
  })
}

const ListFooter = ({isLoadMore, stateLoadMore, style}) => {
  const dispatch = useDispatch()
  const {isFetching, isError} = stateLoadMore
  return (
    <View style={{margin: 10, alignItems: 'center'}}>
      {isLoadMore ? (
        isFetching ? (
          <ActivityIndicator size={'large'} color={style.color} />
        ) : (
          <TouchableOpacity
            onPress={() => {
              dispatch(
                actionNotifyCreator.add_notify({
                  notify_detail_id: '9edc3410-e26c-4925-8209-c65e2744995e',
                  notify_type: 'new_post',
                  title: 'Thông báo từ server',
                  message: 'Người bạn đang theo dõi vừa đăng bài mới'
                })
              )
              global._notify.localNotify({
                title: 'Title',
                message: 'Message'
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
