import {Icon} from '@components'
import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {Divider, Menu, Provider} from 'react-native-paper'

export default function Header({navigation, style}) {
  const [visible, setVisible] = React.useState(false)

  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)
  return (
    <View style={style.header_container}>
      <TouchableOpacity onPress={() => navigation.goBack('Home')}>
        <Icon type={'Entypo'} name="chevron-left" style={style.back_button} />
      </TouchableOpacity>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <Icon
              name="ellipsis-vertical-outline"
              style={style.more_button}
              size={28}
              color={style.colors.primaryText}
            />
          </TouchableOpacity>
        }>
        <Menu.Item
          onPress={() => {}}
          title="Sửa tin"
          icon={() => (
            <Icon
              type="Entypo"
              style={{paddingRight: 15}}
              name="edit"
              size={28}
              color={style.colors.primaryText}
            />
          )}
        />
        <Menu.Item
          onPress={() => {}}
          title="Ẩn tin"
          icon={() => (
            <Icon
              style={{paddingRight: 15}}
              name="eye-off-outline"
              size={28}
              color={style.colors.primaryText}
            />
          )}
        />
        <Divider />
        <Menu.Item
          onPress={() => {}}
          title="Báo cáo"
          icon={() => (
            <Icon
              style={{paddingRight: 15}}
              name="alert-circle-outline"
              size={28}
              color={style.colors.primaryText}
            />
          )}
        />
      </Menu>
    </View>
  )
}
