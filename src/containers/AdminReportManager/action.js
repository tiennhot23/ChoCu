import {helper} from '@common'
import {apiBase, METHOD_GET, METHOD_POST} from 'src/common/api'
import {
  API_REQUEST_CLEAR_POST_REPORTS,
  API_REQUEST_REPORTS
} from 'src/constants/api'

const START_REQUEST_REPORTS = 'START_REQUEST_REPORTS'
const STOP_REQUEST_REPORTS = 'STOP_REQUEST_REPORTS'

export const adminReportsManagerAction = {
  START_REQUEST_REPORTS,
  STOP_REQUEST_REPORTS
}

export const requestReports = () => async (dispatch, getState) => {
  dispatch(startRequest())
  apiBase(API_REQUEST_REPORTS, METHOD_GET)
    .then(async (response) => {
      if (helper.isNonEmptyArray(response.data)) {
        dispatch(stopRequest({reportsData: response.data}))
      } else {
        dispatch(stopRequest({reportsData: [], message: response.message}))
      }
    })
    .catch((err) => {
      dispatch(
        stopRequest({
          reportsData: [],
          isEmpty: true,
          message: err.message,
          isError: true
        })
      )
    })
}

export const removePostReports =
  ({post_id}) =>
  async (dispatch, getState) => {
    let reportsData = [...getState().adminReportsManagerReducer.reportsData]
    dispatch(startRequest())
    apiBase(API_REQUEST_CLEAR_POST_REPORTS + `/${post_id}`, METHOD_POST)
      .then(async (response) => {
        const {data} = response
        if (helper.isNonEmptyArray(response.data)) {
          reportsData = reportsData.filter((e) => e.post_id !== post_id)
          dispatch(stopRequest({reportsData, isActionDone: true}))
        } else {
          dispatch(stopRequest({reportsData, message: response.message}))
        }
      })
      .catch((err) => {
        dispatch(
          stopRequest({
            reportsData,
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const startRequest = () => {
  return {
    type: START_REQUEST_REPORTS
  }
}

export const stopRequest = ({
  reportsData,
  isActionDone = false,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_REQUEST_REPORTS,
    reportsData,
    isActionDone,
    isEmpty,
    message,
    isError
  }
}
