import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
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
import {normalIcon, smallIcon} from 'src/constants/constant'

const LocationSelection = forwardRef(
  (
    {bindCallbackRef, color = 'black', backgroundColor = 'white', setAddress},
    ref
  ) => {
    const [provinces, setProvinces] = useState(['a', 'b', 'c'])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [prov, setProv] = useState('')
    const [dist, setDist] = useState('')
    const [ward, setWard] = useState('')

    useImperativeHandle(ref, () => ({
      getData() {
        return (
          (ward ? `${ward}, ` : '') +
          (helper.isNonEmptyString(dist) ? `${dist}, ` : '') +
          (helper.isNonEmptyString(prov) ? `${prov}` : '')
        )
      }
    }))

    useEffect(() => {
      fetch(baseUrl + '/location/provinces')
        .then((res) => res.json())
        .then((res) => {
          let {data} = res
          data = helper.isArray(data)
            ? data.map((item, index) => {
                return {title: item.province, id: index}
              })
            : []
          setProvinces(data)
        })
        .catch((ignored) => {
          console.error(ignored)
        })
    }, [])

    const onSelectProvince = (province) => {
      setDist('')
      setDistricts([])
      setProv(province.title)
      fetch(baseUrl + `/location/districts?province=${province.title}`)
        .then((res) => res.json())
        .then((res) => {
          let {data} = res
          data = helper.isArray(data)
            ? data.map((item, index) => {
                return {title: item.district, id: index}
              })
            : []
          setDistricts(data)
        })
        .catch((ignored) => {
          console.error(ignored)
        })
    }

    const onSelectDisctrict = (district) => {
      setWard('')
      setWards([])
      setDist(district.title)
      fetch(baseUrl + `/location/wards?district=${district.title}`)
        .then((res) => res.json())
        .then((res) => {
          let {data} = res
          data = helper.isArray(data)
            ? data.map((item, index) => {
                return {title: item.ward, id: index}
              })
            : []
          setWards(data)
        })
        .catch((ignored) => {
          console.error(ignored)
        })
    }

    const onSelectWard = (ward) => setWard(ward.title)

    const onSubmit = () => {
      // setAddress(
      //   (helper.isNonEmptyString(detailAddressRef.current.getText())
      //     ? `${detailAddressRef.current.getText()}, `
      //     : '') +
      //     (ward ? `${ward}, ` : '') +
      //     (helper.isNonEmptyString(dist) ? `${dist}, ` : '') +
      //     (helper.isNonEmptyString(prov) ? `${prov}` : '')
      // )
    }

    const onCancel = () => {}
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            paddingVertical: 10,
            alignItems: 'flex-start',
            flexDirection: 'row'
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              alignSelf: 'center'
            }}
            onPress={() => {
              setProv('')
              setDist('')
              setWard('')
            }}>
            <Icon name={'close-outline'} size={normalIcon} color={color} />
          </TouchableOpacity>
          <AnimatedDropdown
            width={150}
            data={provinces}
            item={prov}
            required
            title={'Tỉnh/Thành phố'}
            onSelect={onSelectProvince}
          />
          {helper.isNonEmptyString(prov) && (
            <AnimatedDropdown
              width={150}
              data={districts}
              item={dist}
              required
              title={'Quận/Huyện'}
              onSelect={onSelectDisctrict}
            />
          )}
          {helper.isNonEmptyString(dist) && (
            <AnimatedDropdown
              width={150}
              data={wards}
              item={ward}
              required
              title={'Phường/Xã'}
              onSelect={onSelectWard}
            />
          )}
        </View>
      </ScrollView>
    )
  }
)
export default LocationSelection
