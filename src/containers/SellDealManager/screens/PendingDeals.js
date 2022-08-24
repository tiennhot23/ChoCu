import React, {useEffect, useState} from 'react'
import {FlatList, Image, View} from 'react-native'
import {useSelector} from 'react-redux'
import {DEAL_SCR, POST_SCR} from 'src/constants/constant'
import DealItem from '../components/DealItem'

export default function PendingDeals({route, navigation}) {
  const userDeals = useSelector((state) => state.userDealsReducer.dataSellDeals)
  const [deals, setDeals] = useState([...userDeals])

  useEffect(() => {
    setDeals(userDeals.filter((item) => item.deal_state === 'pending'))
  }, [userDeals])

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {deals.length === 0 ? (
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREGQUxg5bo2JPoK87B8lN9hrwXGYAHVNmvO8nryc56N8YrVms-dI403_VM5ZQ2pnRcvuw&usqp=CAU'
          }}
          style={{
            width: '50%',
            height: '50%',
            alignSelf: 'center',
            justifyContent: 'center'
          }}
          resizeMode="contain"
        />
      ) : (
        <FlatList
          data={deals}
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}
          renderItem={({item, index}) => (
            <DealItem
              deal={item}
              onPress={() =>
                navigation.navigate(DEAL_SCR, {
                  dealId: item.deal_id,
                  actions: [
                    {
                      label: 'Xác nhận',
                      action: 'confirm',
                      nextState: 'confirmed',
                      onActionDone: () => {
                        navigation.jumpTo('CONFIRMEDDEALS')
                      }
                    },
                    {
                      label: 'Huỷ',
                      action: 'cancel',
                      nextState: 'canceled',
                      onActionDone: () => {
                        navigation.jumpTo('CANCELEDDEALS')
                      }
                    }
                  ]
                })
              }
            />
          )}
        />
      )}
    </View>
  )
}
