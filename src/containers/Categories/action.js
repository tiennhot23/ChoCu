import {helper} from '@common'
import {apiBase, METHOD_GET} from 'src/common/api'
import {
  API_REQUEST_CATEGORIES,
  API_REQUEST_CATEGORY_DETAILS
} from 'src/constants/api'

const START_GET_CATEGORIES = 'START_GET_CATEGORIES'
const STOP_GET_CATEGORIES = 'STOP_GET_CATEGORIES'
const START_GET_DETAILS = 'START_GET_DETAILS'
const STOP_GET_DETAILS = 'STOP_GET_DETAILS'

export const categoriesAction = {
  START_GET_CATEGORIES,
  STOP_GET_CATEGORIES,
  START_GET_DETAILS,
  STOP_GET_DETAILS
}

export const requestCategories = () => (dispatch, getState) => {
  dispatch(startGetCategories())
  apiBase(API_REQUEST_CATEGORIES, METHOD_GET)
    .then((res) => {
      const {data} = res
      if (helper.isNonEmptyArray(data)) {
        dispatch(stopGetCategories({categories: data}))
      } else {
        dispatch(
          stopGetCategories({
            categories: [],
            message: res.message || '',
            isEmpty: true
          })
        )
      }
    })
    .catch((err) => {
      dispatch(
        stopGetCategories({
          categories: [],
          isEmpty: true,
          message: err.message,
          isError: true
        })
      )
    })
}

export const requestDetails =
  ({category_id}) =>
  (dispatch, getState) => {
    dispatch(startGetDetails())
    apiBase(API_REQUEST_CATEGORY_DETAILS + category_id, METHOD_GET)
      .then((res) => {
        const {data} = res
        if (helper.isNonEmptyArray(data)) {
          dispatch(stopGetDetails({category_id, details: data}))
        } else {
          dispatch(
            stopGetDetails({
              category_id,
              details: [],
              message: res.message || '',
              isEmpty: true
            })
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopGetDetails({
            category_id,
            details: [],
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const startGetCategories = () => {
  return {
    type: START_GET_CATEGORIES
  }
}

export const stopGetCategories = ({
  categories,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_GET_CATEGORIES,
    categories,
    isEmpty,
    message,
    isError
  }
}

export const startGetDetails = () => {
  return {
    type: START_GET_DETAILS
  }
}

export const stopGetDetails = ({
  category_id,
  details,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_GET_DETAILS,
    category_id,
    details,
    isEmpty,
    message,
    isError
  }
}
