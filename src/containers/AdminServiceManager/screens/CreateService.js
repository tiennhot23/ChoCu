import {helper} from '@common'
import {Input, KeyboardView, ModalLoading} from '@components'
import React, {useEffect, useRef, useState} from 'react'
import {View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {addService, updateService} from '../action'
import FormButton from '../components/FormButton'

export default function CreateService({
  route,
  navigation,
  color = 'black',
  backgroundColor = 'white',
  width = '80%'
}) {
  let isShouldBack = false
  const {theme, onGoBack, service} = route.params
  const dispatch = useDispatch()
  const nameRef = useRef()
  const postTurnRef = useRef()
  const descRef = useRef()
  const priceRef = useRef()
  const servicesState = useSelector(
    (state) => state.adminServicesManagerReducer.servicesState
  )

  useEffect(() => {
    if (servicesState.isActionDone) {
      // onGoBack()
      dispatch({type: 'RESET_STATE'})
      navigation.goBack()
    }
  }, [servicesState])

  const onSubmit = () => {
    let s = {
      service_name: nameRef.current.getText(),
      post_turn: postTurnRef.current.getText(),
      description: descRef.current.getText(),
      price: priceRef.current.getText()
    }

    if (!validateRequest(s)) return
    if (service) {
      s.service_id = service?.service_id
      dispatch(updateService(s))
    } else {
      dispatch(addService(s))
    }
  }

  const validateRequest = (service) => {
    if (!service.service_name || helper.isEmptyString(service.service_name)) {
      nameRef.current.alertMessage('Tên dịch vụ không được để trống')
      return false
    }
    if (!service.post_turn || helper.isEmptyString(service.post_turn)) {
      postTurnRef.current.alertMessage('Luợt đăng bài không được để trống')
      return false
    }
    if (!service.price || helper.isEmptyString(service.price)) {
      priceRef.current.alertMessage('Gía không được để trống')
      return false
    }

    return true
  }

  return (
    <KeyboardView>
      <View
        style={[
          {
            backgroundColor: theme.primaryBackground,
            flex: 1,
            alignItems: 'center'
          }
        ]}>
        <ModalLoading loading={servicesState.isFetching} />
        <Input
          title={'Tên dịch vụ'}
          required
          ref={nameRef}
          _text={service?.service_name}
          placeholder={'Tiêu đề'}
        />
        <Input
          title={'Số lượt đăng'}
          required
          inputType="numeric"
          ref={postTurnRef}
          _text={String(service?.post_turn || '')}
          placeholder={'Số lượt đăng công thêm'}
        />
        <Input
          title={'Mô tả'}
          ref={descRef}
          _text={service?.description}
          placeholder={'Mô tả dịch vụ'}
          multiline
          height={150}
        />
        <Input
          title={'Giá'}
          inputType="money"
          required
          ref={priceRef}
          _text={String(service?.price || '')}
          placeholder={'Giá dịch vụ'}
        />

        <FormButton title={'Lưu'} onPress={onSubmit} />
      </View>
    </KeyboardView>
  )
}
