import {helper} from '@common'
import {AnimatedDropdown, Icon, Input} from '@components'
import {font} from '@styles'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
  useState
} from 'react'
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {normalIcon} from 'src/constants/constant'
import {requestDetails} from 'src/containers/Categories/action'

const CategorySelection = forwardRef((props, ref) => {
  const dataCategories = useSelector(
    (state) => state.categoriesReducer.dataCategories
  )
  const stateDetails = useSelector(
    (state) => state.categoriesReducer.stateDetails
  )
  const dispatch = useDispatch()
  const [category, setCategory] = useState({})
  const [details, setDetails] = useState([])
  const [_details, _setDetails] = useState([])
  const [message, setMessage] = useState('')

  useImperativeHandle(ref, () => ({
    getData() {
      return {
        category_id: category.id,
        details: _details
      }
    },
    alertMessage(message) {
      setMessage(message)
    },
    setData(category) {
      setCategory(category)
    }
  }))

  const setDetailContent = (index, content) => {
    let _d = _details
    _d[index].content = content
    _setDetails([..._d])
  }

  useEffect(() => {
    dispatch(requestDetails({category_id: category.id}))
  }, [category])

  useEffect(() => {
    const d = dataCategories.filter(
      (item) => item.category_id === category.id
    )[0]?.details
    let _d = []
    d?.forEach((item) => {
      _d.push({details_id: item.details_id, content: ''})
    })
    setDetails(d)
    _setDetails(_d)
  }, [stateDetails])

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          alignSelf: 'center'
        }}
        onPress={() => {
          setCategory([])
          setDetails([])
          setDetails([])
        }}>
        <Icon name={'close-outline'} size={normalIcon} color={'black'} />
      </TouchableOpacity>
      <AnimatedDropdown
        width={150}
        title={'Danh mục'}
        required
        item={category.title}
        data={
          dataCategories.map((item) => {
            return {
              id: item.category_id,
              title: item.category_title
            }
          }) || []
        }
        color={helper.isNonEmptyString(message) ? 'red' : undefined}
        onSelect={(itemSelected) => setCategory(itemSelected)}
      />
      {helper.isNonEmptyString(message) && (
        <Text
          style={{
            width: '80%',
            color: 'red',
            fontSize: font.FONT_SIZE_12,
            padding: 5
          }}>
          {message}
        </Text>
      )}
      {stateDetails.isFetching ? (
        <ActivityIndicator />
      ) : (
        _details &&
        details?.map((item, index) =>
          item.editable ? null : (
            <AnimatedDropdown
              width={150}
              title={item.details_title}
              item={_details[index].content}
              data={item.default_content.map((item) => {
                return {
                  id: item,
                  title: item
                }
              })}
              onSelect={(itemSelected) =>
                setDetailContent(index, itemSelected.title)
              }
            />
          )
        )
      )}
    </ScrollView>
  )
})

export default CategorySelection

export function _Input({_details, _setDetails, id, title}) {
  const onChangeText = (text) => {
    let _d = _details
    _d[id].content = text
    _setDetails([..._d])
  }
  return <Input title={title} onChange={onChangeText} />
}
