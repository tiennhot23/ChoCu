import {BaseText, Icon} from '@components'
import {font} from '@styles'
import React, {useEffect, useState} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {EDIT_INFO_SCR, USER_INFO_SCR} from 'src/constants/constant'

export default AdminHeader = ({
  color = 'black',
  backgroundColor = 'white',
  width = '90%',
  navigate
}) => {
  const user = useSelector((state) => state.currentUserReducer?.userData)
  return (
    <>
      <View style={style.person_container}>
        <View style={style.posts_container}>
          <BaseText text={user?.name} style={[style.bold_text]} />
          <BaseText
            text={user?.email}
            style={[style.nor_text, style.thin_border]}
            onPress={() => {}}
          />
        </View>
      </View>
    </>
  )
}

const style = StyleSheet.create({
  wrapper: {
    padding: 5,
    backgroundColor: 'white'
  },
  person_container: {
    backgroundColor: 'white',
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    flex: 1,
    flexDirection: 'row'
  },
  detail_container: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    borderBottomWidth: 0.5,
    borderBottomColor: 'black'
  },
  posts_container: {
    marginVertical: 10,
    backgroundColor: 'white',
    padding: 5,
    flex: 1,
    flexDirection: 'column'
  },
  bold_text: {
    fontSize: font.FONT_SIZE_16,
    color: 'black',
    marginLeft: 4,
    fontWeight: 'bold',
    padding: 5
  },
  nor_text: {
    color: 'black',
    marginLeft: 4,
    padding: 5
  },
  thin_border: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    margin: 5,
    padding: 10,
    alignSelf: 'flex-start'
  },
  detail_item: {flexDirection: 'row', alignItems: 'center'}
})
