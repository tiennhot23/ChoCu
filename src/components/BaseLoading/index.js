import React, {PureComponent} from 'react'
import {View} from 'react-native'
import Lottie from 'lottie-react-native'
import {loading} from '@animation'
import {BaseText, Button} from '@components'

class BaseLoading extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    let {
      isLoading,
      isError,
      isEmpty,
      textLoading,
      textLoadingError,
      content,
      onPressTryAgains
    } = this.props
    if (isLoading) {
      return (
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff'
          }}>
          <View
            style={{backgroundColor: '#000', borderRadius: 10, padding: 10}}>
            <Lottie
              autoPlay={isLoading}
              source={loading}
              style={{
                height: 66,
                width: 66
              }}
            />
          </View>
          <BaseText
            color={'#000'}
            style={{
              marginTop: 10,
              textAlign: 'center'
            }}
            text={textLoading ? textLoading : 'Loading'}
          />
        </View>
      )
    } else if (!isLoading && isError) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            flex: 1,
            width: '100%'
          }}>
          <View
            style={{
              padding: 10,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center'
            }}>
            <BaseText
              color={'#000'}
              style={{
                fontWeight: 'bold',
                textAlign: 'center'
              }}
              text={textLoadingError ? textLoadingError : 'Loading'}
            />
            <Button
              text={'Try again'}
              onPress={onPressTryAgains}
              styleContainer={{
                backgroundColor: '#000',
                borderColor: '#000',
                borderWidth: 1,
                width: 80,
                height: 40,
                borderRadius: 4,
                marginTop: 10,
                marginBottom: 10,
                justifyContent: 'center'
              }}
              styleText={{
                color: '#FFFFFF',
                fontWeight: 'bold',
                alignSelf: 'center'
              }}
            />
          </View>
        </View>
      )
    } else if (!isLoading && isEmpty) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            flex: 1,
            width: '100%'
          }}>
          <View
            style={{
              padding: 10,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center'
            }}>
            <BaseText
              color={'#000'}
              style={{
                fontWeight: 'bold',
                textAlign: 'center'
              }}
              text={textLoadingError ? textLoadingError : 'Empty'}
            />
          </View>
        </View>
      )
    } else {
      return (
        <View
          style={{
            flex: 1
          }}>
          {this.props.children}
        </View>
      )
    }
  }
}

export default BaseLoading
