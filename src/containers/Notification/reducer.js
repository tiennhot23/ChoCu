import {notifyState} from './state'
import {notifyAction} from './action'
import {helper} from '@common'

const notifyReducer = function (state = notifyState, action) {
  let newDataNotify
  switch (action.type) {
    case notifyAction.ADD_NOTIFY:
      return {
        ...state,
        dataNotify: [...state.dataNotify, action.notify]
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
    case notifyAction.MARK_NOTIFY_AS_READ:
      newDataNotify = state.dataNotify
      newDataNotify[action.notifyIndex].isRead = true
      return {
        ...state,
        dataNotify: [...newDataNotify]
      }
    case notifyAction.DELETE_NOTIFY:
      newDataNotify = state.dataNotify
      newDataNotify.splice(action.notifyIndex, 1)
      return {
        ...state,
        dataNotify: [...newDataNotify]
      }
    case notifyAction.CLEAR_ALL_NOTIFY:
      return {
        ...state,
        dataNotify: []
      }
    default:
      return state
  }
}

export {notifyReducer}
