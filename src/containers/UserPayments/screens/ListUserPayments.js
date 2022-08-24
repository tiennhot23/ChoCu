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
  Modal
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {
  requestPayments,
  requestUserPayments,
  unlinkPayment
} from 'src/containers/Payment/action'
import {requestCateDetails, requestCategories} from '../action'
import PaymentInfo from '../compoents/PaymentInfo'

export default function ListUserPayments({route, navigation}) {
  const {theme, user_id} = route.params
  const payments = useSelector((state) => state.paymentsReducer.dataPayments)
  const userpayments = useSelector(
    (state) => state.paymentsReducer.dataUserPayments
  )
  const stateUserPayments = useSelector(
    (state) => state.paymentsReducer.stateUserPayments
  )
  const [mPayments, setPayments] = useState([])
  let [showModal, setShowModal] = useState([])
  let [paymentId, setPaymentId] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(requestUserPayments({user_id}))
    dispatch(requestPayments())
  }, [])

  useEffect(() => {
    let tmp = payments.map((e) => {
      return {
        payments: e,
        userpayments: userpayments.find((el) => e.payment_id === el.payment_id)
      }
    })
    setPayments(tmp)
  }, [userpayments, payments])

  const onRefresh = () => {
    dispatch(requestUserPayments({user_id}))
  }

  return (
    <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
      <ScrollView>
        <ModalLoading loading={stateUserPayments.isActioning} />
        <Modal visible={showModal} transparent>
          <PaymentInfo
            payment_id={paymentId}
            onCancel={() => {
              setShowModal(false)
              onRefresh()
            }}
          />
        </Modal>
        <View>
          {mPayments?.map((item, index) => {
            let icon = ''
            let color = ''
            switch (item.payments.payment_id) {
              case 'paypal':
                color = '#0050a0'
                icon =
                  'https://freight.cargo.site/t/original/i/cffe32310dc12d3e47fd5f23ea4a03ea094cb81863df1a620df418d263d75061/Paypal-Logo.png'
                break
              case 'momo':
                color = '#e7298a'
                icon =
                  'https://business.momo.vn/assets/landingpage/img/931b119cf710fb54746d5be0e258ac89-logo-momo.png'
                break
              default:
                break
            }
            let isLinked = item.userpayments
            return (
              <View
                style={{
                  flexDirection: 'column',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  margin: 5,
                  borderRadius: 10,
                  elevation: 5
                }}
                key={item.payments.payment_id}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                    alignItems: 'center'
                  }}>
                  <Image source={{uri: icon}} style={{width: 50, height: 50}} />
                  <BaseText
                    style={{marginHorizontal: 10}}
                    size={20}
                    text={`${item.payments.title}`}
                  />
                  <BaseText
                    style={{marginHorizontal: 10}}
                    text={`${isLinked ? isLinked.user_payment_info : ''}`}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 1,
                    alignSelf: 'flex-end'
                  }}>
                  {!isLinked && (
                    <BaseText
                      style={{
                        marginHorizontal: 10,
                        color,
                        fontWeight: '800',
                        letterSpacing: 0.5,
                        marginVertical: 4,
                        marginEnd: 30
                      }}
                      text={`Liên kết`}
                      onPress={() => {
                        setPaymentId(item.payments.payment_id)
                        setShowModal(true)
                      }}
                    />
                  )}
                  {isLinked && (
                    <BaseText
                      style={{
                        marginHorizontal: 10,
                        color,
                        fontWeight: '800',
                        letterSpacing: 0.5,
                        marginVertical: 4,
                        marginEnd: 30
                      }}
                      text={`Xoá liên kết`}
                      onPress={() => {
                        dispatch(
                          unlinkPayment({payment_id: item.payments.payment_id})
                        )
                        onRefresh()
                      }}
                    />
                  )}
                </View>
              </View>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}
