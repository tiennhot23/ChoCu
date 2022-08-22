import {helper} from '@common'
import {
  apiBase,
  CONTENT_TYPE_MULTIPART,
  METHOD_GET,
  METHOD_POST
} from 'src/common/api'
import {
  API_REQUEST_APPROVE_POST,
  API_REQUEST_CATEGORIES,
  API_REQUEST_CATEGORY_ADD_DETAILS,
  API_REQUEST_CATEGORY_DETAILS,
  API_REQUEST_DENY_POST,
  API_REQUEST_DETAILS,
  API_REQUEST_PENDING_POST
} from 'src/constants/api'

const START_REQUEST_CATEGORY = 'START_REQUEST_CATEGORY'
const STOP_REQUEST_CATEGORY = 'STOP_REQUEST_CATEGORY'
const START_REQUEST_DETAILS = 'START_REQUEST_DETAILS'
const STOP_REQUEST_DETAILS = 'STOP_REQUEST_DETAILS'
const START_REQUEST_CATE_DETAILS = 'START_REQUEST_CATE_DETAILS'
const STOP_REQUEST_CATE_DETAILS = 'STOP_REQUEST_CATE_DETAILS'

export const adminCategoriesManagerAction = {
  START_REQUEST_CATEGORY,
  STOP_REQUEST_CATEGORY,
  START_REQUEST_DETAILS,
  STOP_REQUEST_DETAILS,
  START_REQUEST_CATE_DETAILS,
  STOP_REQUEST_CATE_DETAILS
}

export const requestCategories = () => async (dispatch, getState) => {
  dispatch(startRequestCategories())
  apiBase(API_REQUEST_CATEGORIES, METHOD_GET)
    .then(async (response) => {
      if (helper.isNonEmptyArray(response.data)) {
        dispatch(stopRequestCategories({categoriesData: response.data}))
      } else {
        dispatch(
          stopRequestCategories({categoriesData: [], message: response.message})
        )
      }
    })
    .catch((err) => {
      dispatch(
        stopRequestCategories({
          categoriesData: [],
          isEmpty: true,
          message: err.message,
          isError: true
        })
      )
    })
}

export const requestDetails = () => async (dispatch, getState) => {
  dispatch(startRequestDetails())
  apiBase(API_REQUEST_DETAILS, METHOD_GET)
    .then(async (response) => {
      if (helper.isNonEmptyArray(response.data)) {
        dispatch(stopRequestDetails({detailsData: response.data}))
      } else {
        dispatch(
          stopRequestDetails({detailsData: [], message: response.message})
        )
      }
    })
    .catch((err) => {
      dispatch(
        stopRequestDetails({
          detailsData: [],
          isEmpty: true,
          message: err.message,
          isError: true
        })
      )
    })
}

export const requestCateDetails =
  ({category_id}) =>
  async (dispatch, getState) => {
    dispatch(startRequestCateDetails())
    apiBase(API_REQUEST_CATEGORY_DETAILS + `${category_id}`, METHOD_GET)
      .then(async (response) => {
        if (helper.isNonEmptyArray(response.data)) {
          dispatch(stopRequestCateDetails({cateDetailsData: response.data}))
        } else {
          dispatch(
            stopRequestCateDetails({
              cateDetailsData: [],
              message: response.message
            })
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopRequestCateDetails({
            cateDetailsData: [],
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const addCategory =
  ({formData}) =>
  async (dispatch, getState) => {
    let categoriesData = [
      ...getState().adminCategoriesManagerReducer.categoriesData
    ]
    dispatch(startRequestCategories())
    apiBase(API_REQUEST_CATEGORIES, METHOD_POST, formData, {
      contentType: CONTENT_TYPE_MULTIPART
    })
      .then(async (response) => {
        const {data} = response
        if (helper.isNonEmptyArray(response.data)) {
          categoriesData.push(data[0])
          dispatch(stopRequestCategories({categoriesData, isActionDone: true}))
        } else {
          dispatch(
            stopRequestCategories({categoriesData, message: response.message})
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopRequestCategories({
            categoriesData,
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const addDetails =
  ({formData}) =>
  async (dispatch, getState) => {
    let detailsData = [...getState().adminCategoriesManagerReducer.detailsData]
    dispatch(startRequestDetails())
    apiBase(API_REQUEST_DETAILS, METHOD_POST, formData, {
      contentType: CONTENT_TYPE_MULTIPART
    })
      .then(async (response) => {
        const {data} = response
        if (helper.isNonEmptyArray(response.data)) {
          detailsData.push(data[0])
          dispatch(stopRequestDetails({detailsData, isActionDone: true}))
        } else {
          dispatch(stopRequestDetails({detailsData, message: response.message}))
        }
      })
      .catch((err) => {
        dispatch(
          stopRequestDetails({
            detailsData,
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const addDetailsToCategory =
  ({category_id, details_id, required}) =>
  async (dispatch, getState) => {
    let cateDetailsData = [
      ...getState().adminCategoriesManagerReducer.cateDetailsData
    ]
    dispatch(startRequestCateDetails())
    apiBase(API_REQUEST_CATEGORY_ADD_DETAILS + `/${category_id}`, METHOD_POST, {
      details_id,
      required
    })
      .then(async (response) => {
        const {data} = response
        if (helper.isNonEmptyArray(response.data)) {
          let detailsData = [
            ...getState().adminCategoriesManagerReducer.detailsData
          ]
          let details = detailsData.find((e) => e.details_id === details_id)
          cateDetailsData.push({...details, required})
          dispatch(
            stopRequestCateDetails({cateDetailsData, isActionDone: true})
          )
        } else {
          dispatch(
            stopRequestCateDetails({cateDetailsData, message: response.message})
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopRequestCateDetails({
            cateDetailsData,
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const addMultiDetailsToCategory =
  ({category_id, details}) =>
  async (dispatch, getState) => {
    let cateDetailsData = [
      ...getState().adminCategoriesManagerReducer.cateDetailsData
    ]
    dispatch(startRequestCateDetails())
    apiBase(API_REQUEST_CATEGORY_ADD_DETAILS + `/${category_id}`, METHOD_POST, {
      details
    })
      .then(async (response) => {
        const {data} = response
        if (helper.isNonEmptyArray(response.data)) {
          cateDetailsData = cateDetailsData.concat(data)
          dispatch(
            stopRequestCateDetails({cateDetailsData, isActionDone: true})
          )
        } else {
          dispatch(
            stopRequestCateDetails({cateDetailsData, message: response.message})
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopRequestCateDetails({
            cateDetailsData,
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const startRequestCategories = () => {
  return {
    type: START_REQUEST_CATEGORY
  }
}

export const stopRequestCategories = ({
  categoriesData,
  isActionDone = false,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_REQUEST_CATEGORY,
    categoriesData,
    isActionDone,
    isEmpty,
    message,
    isError
  }
}

export const startRequestDetails = () => {
  return {
    type: START_REQUEST_DETAILS
  }
}

export const stopRequestDetails = ({
  detailsData,
  isActionDone = false,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_REQUEST_DETAILS,
    detailsData,
    isActionDone,
    isEmpty,
    message,
    isError
  }
}

export const startRequestCateDetails = () => {
  return {
    type: START_REQUEST_CATE_DETAILS
  }
}

export const stopRequestCateDetails = ({
  cateDetailsData,
  isActionDone = false,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_REQUEST_CATE_DETAILS,
    cateDetailsData,
    isActionDone,
    isEmpty,
    message,
    isError
  }
}
