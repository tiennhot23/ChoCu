import {BaseText, Icon, ModalLoading} from '@components'
import {font} from '@styles'
import React, {useEffect, useState} from 'react'
import {
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Text
} from 'react-native'
import WebView from 'react-native-webview'
import {useDispatch, useSelector} from 'react-redux'
import {usePrev} from 'src/common/hooks'
import {baseUrl} from 'src/constants/api'
import {addUserServices} from '../action'

export default function ListPostTurnServices({route, navigation}) {
  const statePostTurnServices = useSelector(
    (state) => state.postTurnServicesReducer.statePostTurnServices
  )
  const {theme} = route.params
  const [services, setServices] = useState([])
  const [service, setService] = useState(null)
  const [showPayPal, setShowPayPal] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    fetch(baseUrl + '/services')
      .then((res) => res.json())
      .then((res) => setServices(res.data))
      .catch((err) => console.log(err))
  }, [])

  const handlePaypalPaymentResponse = (data) => {
    console.log('PAYPAL_RESPONSE', data)
    if (data.title.includes('success')) {
      setShowPayPal(false)
      dispatch(
        addUserServices({
          price: service?.price,
          post_turn: service?.post_turn
        })
      )
    } else if (data.title.includes('cancel')) {
      setShowPayPal(false)
      alert('Payment canceled')
    } else {
      return
    }
  }

  useEffect(() => {
    if (statePostTurnServices.isActionDone) {
      alert('Mua lượt đăng bài thành công')
      dispatch({type: 'RESET_STATE'})
    }
  }, [statePostTurnServices])

  return (
    <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
      <ScrollView>
        <ModalLoading loading={statePostTurnServices.isActioning} />
        <Modal visible={showPayPal} onRequestClose={() => setShowPayPal(false)}>
          <WebView
            source={{
              uri:
                baseUrl +
                `/paypal?item_name=${service?.service_name}&price=${service?.price}`
            }}
            onNavigationStateChange={(data) =>
              handlePaypalPaymentResponse(data)
            }
          />
        </Modal>
        <View>
          {services
            ?.sort((a, b) => a.service_id - b.service_id)
            .map((item, index) => {
              let icon = ''
              switch (item.service_name) {
                case 'Gói Bronze':
                  icon =
                    'https://harperlibrary.typepad.com/.a/6a0105368f4fef970b01b8d20a2631970c-800wi'
                  break
                case 'Gói Golden':
                  icon =
                    'https://www.elm.org/wp-content/uploads/2014/05/gold-star.jpg'
                  break
                case 'Gói Silver':
                  icon =
                    'https://thumbs.dreamstime.com/b/silver-star-3301715.jpg'
                  break
                default:
                  break
              }
              return (
                <View
                  style={{
                    width: '80%',
                    alignSelf: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    margin: 5,
                    borderRadius: 10,
                    borderWidth: 2
                  }}
                  key={item.service_id}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                    <Image
                      source={{uri: icon}}
                      style={{width: 40, height: 40}}
                    />
                    <BaseText
                      style={{marginLeft: 10}}
                      size={20}
                      text={`${item.service_name}`}
                    />
                  </View>

                  <BaseText
                    style={{
                      marginVertical: 10,
                      textAlign: 'center',
                      letterSpacing: 1,
                      fontWeight: '800'
                    }}
                    text={`${item.description}`}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                    <Text
                      style={{
                        textDecorationLine: 'underline line-through'
                      }}>
                      {item.post_turn !== 10 ? item.post_turn * 20000 : ''}
                    </Text>
                    <BaseText
                      style={{
                        marginVertical: 10,
                        textAlign: 'center',
                        letterSpacing: 1,
                        fontWeight: '800',
                        color: 'red',
                        paddingHorizontal: 20
                      }}
                      size={20}
                      text={`${item.price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'VND'
                      })}`}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 1,
                      alignSelf: 'center'
                    }}>
                    <BaseText
                      style={{
                        fontSize: 20,
                        marginHorizontal: 10,
                        color: 'black',
                        fontWeight: '800',
                        letterSpacing: 0.5,
                        marginVertical: 4,
                        padding: 10,
                        borderRadius: 10,
                        borderWidth: 0.5
                      }}
                      text={`Mua ngay`}
                      onPress={() => {
                        setService(item)
                        setShowPayPal(true)
                      }}
                    />
                  </View>
                </View>
              )
            })}
        </View>
      </ScrollView>
    </View>
  )
}
