import {helper, storageHelper} from '@common'
import {STORAGE_CONST} from '@constants'
import {apiBase, METHOD_GET, METHOD_POST} from 'src/common/api'
import {getItem} from 'src/common/storage'
import {
  API_REQUEST_ADD_USER_PAYMENTS,
  API_REQUEST_ADD_USER_SERVICE,
  API_REQUEST_PAYMENTS,
  API_REQUEST_REMOVE_USER_PAYMENTS,
  API_REQUEST_USER_PAYMENTS
} from 'src/constants/api'

const START_GET_LIST_POST_TURN_SERVICES = 'START_GET_LIST_POST_TURN_SERVICES'
const STOP_GET_LIST_POST_TURN_SERVICES = 'STOP_GET_LIST_POST_TURN_SERVICES'
const START_ACTION_ADD_USER_SERVICE = 'START_ACTION_ADD_USER_SERVICE'
const STOP_ACTION_ADD_USER_SERVICE = 'STOP_ACTION_ADD_USER_SERVICE'

export const postTurnServicesAction = {
  START_GET_LIST_POST_TURN_SERVICES,
  STOP_GET_LIST_POST_TURN_SERVICES,
  START_ACTION_ADD_USER_SERVICE,
  STOP_ACTION_ADD_USER_SERVICE
}

export const addUserServices =
  ({service_id, price, post_turn}) =>
  (dispatch, getState) => {
    dispatch(startAction())
    apiBase(API_REQUEST_ADD_USER_SERVICE, METHOD_POST, {
      service_id,
      price,
      post_turn
    })
      .then((res) => {
        const {data} = res
        if (helper.isNonEmptyArray(data)) {
          dispatch(stopAction({data: data[0], isActionDone: true, post_turn}))
        } else {
          dispatch(
            stopAction({
              data: {},
              message: res.message || '',
              isEmpty: true,
              isError: true
            })
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopAction({
            data: {},
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

const startAction = () => {
  return {
    type: START_ACTION_ADD_USER_SERVICE
  }
}

const stopAction = ({
  data,
  post_turn = 0,
  isActionDone = false,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_ACTION_ADD_USER_SERVICE,
    data,
    post_turn,
    isActionDone,
    isEmpty,
    message,
    isError
  }
}
