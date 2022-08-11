import React, {useCallback, useEffect, useRef, useState} from 'react'
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native'
import {
  AnimatedDropdown,
  BottomSheet,
  Button,
  Icon,
  Input,
  KeyboardView
} from '@components'
import {font} from '@styles'
import {baseUrl} from 'src/constants/api'
import {helper} from '@common'
import {constant} from '@constants'
import FormButton from './FormButton'

export default function BottomSheetView({
  bind,
  color = 'black',
  backgroundColor = 'white',
  setAddress
}) {
  const [provinces, setProvinces] = useState(['a', 'b', 'c'])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [prov, setProv] = useState('')
  const [dist, setDist] = useState('')
  const [ward, setWard] = useState('')
  let detailAddressRef = useRef()
  let ref = null

  useEffect(() => {
    fetch(baseUrl + '/location/provinces')
      .then((res) => res.json())
      .then((res) => {
        let {data} = res
        data = helper.isArray(data) ? data.map((item) => item.province) : []
        setProvinces(data)
      })
      .catch((ignored) => {
        console.error(ignored)
      })
  }, [])

  const onSelectProvince = (province) => {
    setProv(province)
    fetch(baseUrl + `/location/districts?province=${province}`)
      .then((res) => res.json())
      .then((res) => {
        let {data} = res
        data = helper.isArray(data) ? data.map((item) => item.district) : []
        setDistricts(data)
      })
      .catch((ignored) => {
        console.error(ignored)
      })
  }

  const onSelectDisctrict = (district) => {
    setDist(district)
    fetch(baseUrl + `/location/wards?district=${district}`)
      .then((res) => res.json())
      .then((res) => {
        let {data} = res
        data = helper.isArray(data) ? data.map((item) => item.ward) : []
        setWards(data)
      })
      .catch((ignored) => {
        console.error(ignored)
      })
  }

  const onSelectWard = (ward) => setWard(ward)

  const onSubmit = () => {
    setAddress(
      (helper.isNonEmptyString(detailAddressRef.current.getText())
        ? `${detailAddressRef.current.getText()}, `
        : '') +
        (ward ? `${ward}, ` : '') +
        (helper.isNonEmptyString(dist) ? `${dist}, ` : '') +
        (helper.isNonEmptyString(prov) ? `${prov}` : '')
    )
  }

  const onCancel = () => {
    ref.scrollTo(0)
  }
  return (
    <BottomSheet
      draggable={false}
      ref={(newRef) => {
        ref = newRef
        bind(newRef)
      }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            paddingVertical: 20,
            alignItems: 'center'
          }}>
          <AnimatedDropdown
            data={provinces}
            item={prov}
            required
            title={'Tỉnh/Thành phố'}
            onSelect={onSelectProvince}
          />
          {helper.isNonEmptyString(prov) && (
            <AnimatedDropdown
              data={districts}
              item={dist}
              required
              title={'quận/Huyện'}
              onSelect={onSelectDisctrict}
            />
          )}
          {helper.isNonEmptyString(dist) && (
            <AnimatedDropdown
              data={wards}
              item={ward}
              required
              title={'Phường/Xã'}
              onSelect={onSelectWard}
            />
          )}

          <Input title={'Địa chỉ cụ thể'} ref={detailAddressRef} />

          <View style={{flexDirection: 'row'}}>
            <FormButton
              title={'Huỷ'}
              color={'black'}
              backgroundColor={'white'}
              styleContainer={{flex: 1, marginLeft: 40}}
              onPress={onCancel}
            />
            <FormButton
              title={'Tiếp tục'}
              styleContainer={{flex: 1, marginRight: 40}}
              onPress={onSubmit}
            />
          </View>
        </View>
      </ScrollView>
    </BottomSheet>
  )
}
