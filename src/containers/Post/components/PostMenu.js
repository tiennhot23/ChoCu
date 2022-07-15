import {Icon} from '@components'
import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {Divider, Menu, Provider} from 'react-native-paper'

export default function PostMenu({theme}) {
  const [visible, setVisible] = React.useState(false)

  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)
  return (
    <View style={{flexDirection: 'row'}}>
      <Icon
        style={{paddingRight: 15}}
        name="bookmark-outline"
        size={28}
        color={theme.colors.primaryText}
      />
      <Icon
        style={{paddingRight: 15}}
        name="alert-circle-outline"
        size={28}
        color={theme.colors.primaryText}
      />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <Icon
              name="ellipsis-vertical-outline"
              size={28}
              color={theme.colors.primaryText}
            />
          </TouchableOpacity>
        }>
        <Menu.Item onPress={() => {}} title="Item 1" />
        <Menu.Item onPress={() => {}} title="Item 2" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Item 3" />
      </Menu>
    </View>
  )
}
