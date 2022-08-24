import React, {PureComponent} from 'react'
import {ActivityIndicator, View} from 'react-native'
import Lottie from 'lottie-react-native'
import {loading} from '@animation'
import {BaseText, Button} from '@components'

class ComponentLoading extends PureComponent {
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
          <ActivityIndicator
            color={'black'}
            style={{
              height: 66,
              width: 66
            }}
          />
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

export default ComponentLoading
