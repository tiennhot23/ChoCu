import React, {useEffect, useState} from 'react'
import {FlatList, View} from 'react-native'
import {useSelector} from 'react-redux'
import {DEAL_SCR, POST_SCR} from 'src/constants/constant'
import DealItem from '../components/DealItem'

export default function ReceivedDeals({route, navigation}) {
  const userDeals = useSelector((state) => state.userDealsReducer.dataSellDeals)
  const [deals, setDeals] = useState([...userDeals])

  useEffect(() => {
    setDeals(
      userDeals.filter(
        (item) => item.deal_state === 'received' || item.deal_state === 'done'
      )
    )
  }, [userDeals])

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        data={deals}
        showsVerticalScrollIndicator={false}
        overScrollMode={'never'}
        renderItem={({item, index}) => (
          <DealItem
            deal={item}
            onPress={() =>
              navigation.navigate(DEAL_SCR, {dealId: item.deal_id, actions: []})
            }
          />
        )}
      />
    </View>
  )
}
