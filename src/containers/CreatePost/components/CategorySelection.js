import {helper} from '@common'
import {AnimatedDropdown, Input} from '@components'
import {font} from '@styles'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
  useState
} from 'react'
import {ActivityIndicator, Text} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
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
    <>
      <AnimatedDropdown
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
          item.editable ? (
            <_Input
              _details={_details}
              _setDetails={_setDetails}
              id={index}
              title={item.details_title}
              required={item.required}
            />
          ) : (
            <AnimatedDropdown
              title={item.details_title}
              required={item.required}
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
    </>
  )
})

export default CategorySelection

export function _Input({_details, _setDetails, id, title, required}) {
  const onChangeText = (text) => {
    let _d = _details
    _d[id].content = text
    _setDetails([..._d])
  }
  return <Input title={title} required={required} onChange={onChangeText} />
}
