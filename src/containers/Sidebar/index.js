import React from 'react'
import {View, StyleSheet} from 'react-native'
import {DrawerContentScrollView} from '@react-navigation/drawer'
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import {useDispatch} from 'react-redux'

import {switchAppTheme} from '../AppTheme/action'
import {useAppTheme} from '../../common/hooks'
import {theme} from '../../styles'
import {storageHelper} from '@common'
import {ENUM, constant} from '@constants'

const {TAG_THEME} = ENUM
const {HOME_SCR} = constant

export const DrawerContent = (props) => {
  const appTheme = useAppTheme()
  const dispatch = useDispatch()

  const handleSwitchTheme = () => {
    storageHelper.saveCurrentTheme(
      appTheme === theme.DarkTheme ? TAG_THEME.light : TAG_THEME.dark
    )
    dispatch(switchAppTheme())
  }

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={[styles.drawerContent]}>
          <View style={styles.userInfoSection}>
            <Avatar.Image
              source={{
                uri: 'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444'
              }}
              size={50}
            />
            <Title style={styles.title}>ONE</Title>
            <Caption style={styles.caption}>email@gmail.com</Caption>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            {/* <Drawer.Item
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label={HOME_SCR}
              onPress={() => {
                props.navigation.navigate(HOME_SCR)
              }}
            />
            <Drawer.Item
              icon={({color, size}) => (
                <Icon name="person-outline" color={color} size={size} />
              )}
              label={PROFILE_SCR}
              onPress={() => {
                props.navigation.navigate(PROFILE_SCR)
              }}
            /> */}
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple onPress={handleSwitchTheme}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch
                    color={appTheme.colors.onSurface}
                    value={appTheme === theme.DarkTheme}
                  />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <Drawer.Item
          icon={({color, size}) => (
            <Icon name="log-out-outline" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {}}
        />
      </Drawer.Section>
    </View>
  )
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1
  },
  userInfoSection: {
    paddingLeft: 20
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3
  },
  drawerSection: {
    marginTop: 15
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16
  }
})
