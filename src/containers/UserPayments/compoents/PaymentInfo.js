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
import {linkPayment, unlinkPayment} from 'src/containers/Payment/action'
import FormButton from 'src/containers/Post/components/FormButton'

export default function PaymentInfo({payment_id, onCancel}) {
  let contentRef = useRef()
  const dispatch = useDispatch()
  const stateUserPayments = useSelector(
    (state) => state.paymentsReducer.stateUserPayments
  )
  useEffect(() => {
    if (stateUserPayments.isActionDone) onCancel()
  }, [stateUserPayments])
  function onLinkPayment() {
    dispatch(
      linkPayment({
        payment_id,
        user_payment_info: contentRef?.current.getText()
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
        <Input
          title={'Thông tin thanh toán'}
          placeholder={`Số điện thoại đã đùng để đăng ký ${payment_id}`}
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
            title={'Liên kết'}
            onPress={onLinkPayment}
          />
        </View>
      </View>
    </View>
  )
}
