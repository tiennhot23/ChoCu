import React from 'react'
import {View, Modal, StyleSheet, Text} from 'react-native'
import LottieView from 'lottie-react-native'
import {loading} from '@animation'

const Loader = ({isLoading, content}) => {
  return (
    isLoading && (
      <Modal transparent={true} animationType="fade" visible={isLoading}>
        <View style={styles.container}>
          <View style={styles.content}>
            <LottieView
              autoPlay={true}
              style={{
                height: 88,
                width: 88
              }}
              source={loading}
            />
            <Text
              style={{
                padding: 10,
                color: 'white',
                fontWeight: 'bold'
              }}>
              {content}
            </Text>
          </View>
        </View>
      </Modal>
    )
  )
}

export default Loader

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center'
  },
  content: {
    height: 64,
    borderRadius: 6,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center'
  }
})
