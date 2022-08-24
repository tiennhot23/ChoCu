import React from 'react'
import {ActivityIndicator, Modal, View} from 'react-native'

export default function ModalLoading({loading = false}) {
  return (
    <Modal visible={loading} transparent>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'white',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <ActivityIndicator color={'black'} />
        </View>
      </View>
    </Modal>
  )
}
