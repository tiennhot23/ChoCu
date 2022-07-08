import React, {PureComponent} from 'react'
import {View} from 'react-native'
import Lottie from 'lottie-react-native'
import {circle_loading} from '@animation'
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
            alignItems: 'center'
          }}>
          <Lottie
            autoPlay={isLoading}
            source={circle_loading}
            style={{
              height: 66,
              width: 66
            }}
          />
          <BaseText
            style={{
              color: '#4285DE',
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
              style={{
                color: '#4285DE',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
              text={textLoadingError ? textLoadingError : 'Loading'}
            />
            <Button
              text={'Try again'}
              onPress={onPressTryAgains}
              styleContainer={{
                backgroundColor: '#288AD6',
                borderColor: '#288AD6',
                borderWidth: 1,
                width: 80,
                height: 40,
                borderRadius: 4,
                marginTop: 10,
                marginBottom: 10
              }}
              styleText={{
                color: '#FFFFFF',
                fontWeight: 'bold'
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
              style={{
                color: '#4285DE',
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
          {content}
        </View>
      )
    }
  }
}

export default BaseLoading
