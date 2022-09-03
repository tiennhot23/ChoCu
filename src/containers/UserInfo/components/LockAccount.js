import {BaseText, Icon, Input} from '@components'
import {dimen} from '@styles'
import moment from 'moment'
import React, {Component, createRef, useEffect, useRef} from 'react'
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {baseUrl} from 'src/constants/api'
import {requestLockAccount} from 'src/containers/AdminAccountManager/action'
import FormButton from 'src/containers/Post/components/FormButton'

export default function LockAccount({onCancel}) {
  let contentRef = useRef()
  const dispatch = useDispatch()
  const accountState = useSelector(
    (state) => state.adminAccountManagerReducer.accountState
  )
  const user = useSelector((state) => state.userInfoReducer.userData)
  function onLockAccount() {
    dispatch(
      requestLockAccount({
        username: user?.phone,
        reason: contentRef?.current.getText()
      })
    )
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
      }}>
      <View
        style={{
          width: '90%',
          paddingVertical: 50,
          backgroundColor: 'white',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text style={{fontSize: 20, padding: 10, color: 'black'}}>
          Khoá đăng bài
        </Text>
        <Text style={{padding: 10, textAlign: 'center', color: 'black'}}>
          Không cho phép người dùng tài khoản này đăng bài
        </Text>
        <Input
          title={'Lí do'}
          multiline={true}
          placeholder={'Người này vi phạm điều gì'}
          height={150}
          ref={contentRef}
        />
        <View
          style={{
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 10,
            backgroundColor: 'white'
          }}>
          <FormButton
            styleContainer={{
              flexDirection: 'row',
              flex: 1,
              height: '100%',
              borderColor: 'black',
              borderWidth: 2,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5
            }}
            color="black"
            backgroundColor="white"
            title={'Huỷ'}
            onPress={onCancel}
          />
          <FormButton
            styleContainer={{
              flexDirection: 'row',
              flex: 1,
              height: '100%',
              borderColor: 'black',
              borderWidth: 2,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5
            }}
            title={'Khoá'}
            onPress={onLockAccount}
          />
        </View>
      </View>
    </View>
  )
}
