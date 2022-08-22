import {notifyState} from './state'
import {notifyAction} from './action'
import {helper} from '@common'
import {initAppAction} from 'src/initApp'

const notifyReducer = function (state = notifyState, action) {
  let newDataNotify
  switch (action.type) {
    case initAppAction.INIT_STORE:
      let dataNotify = [
        ...JSON.parse(action.notifications ? action.notifications : '[]')
      ].reverse()
      return {
        ...state,
        dataNotify: dataNotify
      }
    case notifyAction.ADD_NOTIFY:
      return {
        ...state,
        dataNotify: [action.notify, ...state.dataNotify]
      }

    case notifyAction.START_GET_LIST_NOTIFICATION:
      return {
        ...state,
        dataNotify: [],
        stateNotify: {
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        },
        isLoadMore: false
      }
    case notifyAction.STOP_GET_LIST_NOTIFICATION:
      return {
        ...state,
        dataNotify: action.dataNotify,
        stateNotify: {
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        },
        isLoadMore: action.isLoadMore
      }
    case notifyAction.START_LOAD_MORE_NOTIFICATION:
      return {
        ...state,
        stateLoadMore: {
          isFetching: true,
          isError: false
        },
        isLoadMore: false
      }
    case notifyAction.STOP_LOAD_MORE_NOTIFICATION:
      return {
        ...state,
        dataNotify: action.dataNotify,
        stateLoadMore: {
          isFetching: false,
          isError: action.isError
        },
        isLoadMore: action.isLoadMore
      }
    case notifyAction.UPDATE_DATA_NOTIFY:
      return {
        ...state,
        dataNotify: [...action.dataNotify]
      }
    default:
      return state
  }
}

export {notifyReducer}
