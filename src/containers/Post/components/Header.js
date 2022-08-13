import {Icon} from '@components'
import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {Divider, Menu, Provider} from 'react-native-paper'

export default function Header({navigation, style, theme, postState, isOwner}) {
  const [visible, setVisible] = React.useState(false)

  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)
  return (
    <View style={style.header_container}>
      <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
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
        {postState === 'expired' && (
          <Menu.Item
            onPress={() => {}}
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
        {postState === 'active' && (
          <Menu.Item
            onPress={() => {}}
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
            onPress={() => {}}
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
