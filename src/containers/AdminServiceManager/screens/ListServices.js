import {BaseText, ConfirmDialog, Icon, ModalLoading} from '@components'
import React, {useEffect, useState} from 'react'
import {
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {deleteService, requestPostTurnServices} from '../action'

export default function ListServices({route, navigation}) {
  const {theme} = route.params
  const services = useSelector(
    (state) => state.adminServicesManagerReducer.servicesData
  )
  const servicesState = useSelector(
    (state) => state.adminServicesManagerReducer.servicesState
  )
  const [showConfirm, setShowConfirm] = useState(false)
  const [service, setService] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(requestPostTurnServices())
  }, [])

  useEffect(() => {
    if (servicesState.isActionDone) {
      // onGoBack()
      dispatch({type: 'RESET_STATE'})
    }
  }, [servicesState])

  const onRefresh = () => {
    dispatch(requestPostTurnServices())
  }

  useEffect(() => {
    setShowConfirm(false)
  }, [services])

  return (
    <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
      <ScrollView>
        <ConfirmDialog
          show={showConfirm}
          title={`Xoá dịch vụ ${service?.service_name}`}
          onCanceled={() => setShowConfirm(false)}
          onConfirmed={() => {
            dispatch(deleteService({service_id: service?.service_id}))
          }}
        />
        <ModalLoading loading={servicesState.isActioning} />
        <View>
          {services.map((item) => (
            <>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: 'gray',
                  margin: 10,
                  padding: 4
                }}
                key={item.service_id}
                onPress={() => {
                  // navigation.navigate('catedetails', {
                  //   service: item
                  // })
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 5
                  }}>
                  <Text style={{fontWeight: '800', color: 'black'}}>
                    Tên dịch vụ:
                  </Text>
                  <BaseText text={` ${item.service_name}`} />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 5
                  }}>
                  <Text style={{fontWeight: '800', color: 'black'}}>
                    Số lượt đăng:
                  </Text>
                  <BaseText text={` ${item.post_turn}`} />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 5
                  }}>
                  <Text
                    style={{
                      fontWeight: '800',
                      color: 'black',
                      alignSelf: 'flex-start'
                    }}>
                    Mô tả:
                  </Text>
                  <BaseText text={` ${item.description}`} />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 5
                  }}>
                  <Text style={{fontWeight: '800', color: 'black'}}>Giá:</Text>
                  <BaseText
                    text={` ${item.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'VND'
                    })}`}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginHorizontal: 10
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    alignItems: 'center',
                    margin: 4
                  }}
                  onPress={() => {
                    navigation.navigate('createservices', {
                      service: item,
                      onGoBack: onRefresh
                    })
                  }}>
                  <Icon name="pencil" color="black" size={20} />
                  <Text
                    style={{
                      fontWeight: '800',
                      color: 'black'
                    }}>
                    Chỉnh sửa
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    alignItems: 'center',
                    margin: 4
                  }}
                  onPress={() => {
                    setService(item)
                    setShowConfirm(true)
                  }}>
                  <Icon name="trash" color="black" size={20} />
                  <Text
                    style={{
                      fontWeight: '800',
                      color: 'black'
                    }}>
                    Xoá
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={{
          width: '70%',
          flexDirection: 'row',
          padding: 10,
          borderRadius: 100,
          backgroundColor: 'black',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          margin: 10
        }}
        onPress={() =>
          navigation.navigate('createservices', {onGoBack: onRefresh})
        }>
        <Icon name="add-outline" size={30} color="white" />
        <BaseText
          style={{marginHorizontal: 10, color: 'white'}}
          text={`Thêm dịch vụ mới`}
        />
      </TouchableOpacity>
    </View>
  )
}
