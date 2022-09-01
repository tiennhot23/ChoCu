import {helper} from '@common'
import {Icon} from '@components'
import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {Divider, Menu, Provider} from 'react-native-paper'
import {useDispatch, useSelector} from 'react-redux'
import {
  requestEndPost,
  requestRepostPost
} from 'src/containers/PostsManager/action'

export default function Header({
  navigation,
  onGoBack,
  onReport,
  style,
  theme,
  postState,
  postId,
  isOwner
}) {
  const dispatch = useDispatch()
  const [visible, setVisible] = React.useState(false)
  const currentUser = useSelector((state) => state.currentUserReducer.userData)

  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)

  const endPost = () => {
    dispatch(requestEndPost({post_id: postId}))
    if (helper.isFunction(onGoBack)) onGoBack()
    navigation.goBack()
  }

  const repostPost = () => {
    if (!currentUser?.active)
      alert('Tài khoản của bạn đã bị khoá chức năng đăng bài')
    else if (currentUser?.post_turn === 0) alert('Bạn đã hết lượt đăng bài')
    else dispatch(requestRepostPost({post_id: postId}))
    if (helper.isFunction(onGoBack)) onGoBack()
    navigation.goBack()
  }

  return (
    <View style={style.header_container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.goBack()
        }}>
        <Icon type={'Entypo'} name="chevron-left" style={style.back_button} />
      </TouchableOpacity>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity activeOpacity={1} onPress={openMenu}>
            <Icon
              name="ellipsis-vertical-outline"
              style={style.more_button}
              size={28}
              color={theme.primaryText}
            />
          </TouchableOpacity>
        }>
        {isOwner && postState === 'expired' && (
          <Menu.Item
            onPress={repostPost}
            title="Đăng lại"
            icon={() => (
              <Icon
                type="Entypo"
                style={{paddingRight: 15}}
                name="edit"
                size={28}
                color={theme.primaryText}
              />
            )}
          />
        )}
        {isOwner && postState === 'active' && (
          <Menu.Item
            onPress={endPost}
            title="Ẩn tin"
            icon={() => (
              <Icon
                style={{paddingRight: 15}}
                name="eye-off-outline"
                size={28}
                color={theme.primaryText}
              />
            )}
          />
        )}
        <Divider />
        {!isOwner && (
          <Menu.Item
            onPress={onReport}
            title="Báo cáo"
            icon={() => (
              <Icon
                style={{paddingRight: 15}}
                name="alert-circle-outline"
                size={28}
                color={theme.primaryText}
              />
            )}
          />
        )}
      </Menu>
    </View>
  )
}
