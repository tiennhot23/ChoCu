import {BaseText, Icon, Input} from '@components'
import {dimen} from '@styles'
import moment from 'moment'
import React, {Component, createRef, useRef, useState} from 'react'
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
import {Button} from '@components'
import {font} from '@styles'

export default function ConfirmDialog({
  title = '',
  show = false,
  description = '',
  onCanceled,
  onConfirmed
}) {
  return (
    <Modal visible={show} transparent>
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
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text
            style={{
              fontWeight: '800',
              fontSize: 20,
              color: 'black'
            }}>
            {title}
          </Text>
          <Text style={{color: 'gray', padding: 10, textAlign: 'center'}}>
            {description}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <FormButton
              color="black"
              backgroundColor="white"
              title={'Huỷ'}
              onPress={onCanceled}
            />

            <FormButton title={'Xác nhận'} onPress={onConfirmed} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

function FormButton({
  color = 'white',
  backgroundColor = 'black',
  height = 70,
  styleContainer,
  styleText,
  title,
  onPress
}) {
  return (
    <Button
      onPress={onPress}
      text={title}
      styleContainer={[
        styleContainer,
        {
          flex: 1,
          height,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundColor,
          borderRadius: 10,
          margin: 5,
          borderWidth: 1,
          borderColor: color
        }
      ]}
      styleText={[
        {
          fontWeight: 'bold',
          fontSize: font.FONT_SIZE_16,
          color: color
        },
        styleText
      ]}
    />
  )
}
