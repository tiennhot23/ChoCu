import {BaseText, Icon, Input} from '@components'
import {dimen} from '@styles'
import moment from 'moment'
import React, {Component, createRef, useRef} from 'react'
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {baseUrl} from 'src/constants/api'
import FormButton from '../components/FormButton'

export default function Report({postId, onCancelReport}) {
  let reportInfoRef = useRef()
  let reportContentRef = useRef()
  function onReport() {
    fetch(baseUrl + '/post/report-post' + `/${postId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contact_info: reportInfoRef?.current.getText(),
        content: reportContentRef?.current.getText()
      })
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => {
        onCancelReport()
        alert('Đã báo cáo bài đăng, đang chờ quản trị viên kiểm duyệt')
      })
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
          title={'Thông tin liên hệ'}
          ref={reportInfoRef}
          placeholder={'Admin sẽ liên hệ với bạn nếu cần biết thêm chi tiết'}
        />
        <Input
          title={'Nội dung'}
          multiline={true}
          placeholder={'Bài đăng này vi phạm điều gì?'}
          height={150}
          ref={reportContentRef}
        />
        <FormButton title={'Báo cáo'} onPress={onReport} />
        <FormButton
          color="black"
          backgroundColor="white"
          title={'Huỷ'}
          onPress={onCancelReport}
        />
      </View>
    </View>
  )
}
