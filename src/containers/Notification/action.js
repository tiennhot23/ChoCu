import {helper, storageHelper} from '@common'
import {STORAGE_CONST} from '@constants'
import {getItem, setItem} from 'src/common/storage'
import {NOTIFICATIONS} from 'src/constants/storage'

const START_GET_LIST_NOTIFICATION = 'START_GET_LIST_NOTIFICATION'
const STOP_GET_LIST_NOTIFICATION = 'STOP_GET_LIST_NOTIFICATION'
const START_LOAD_MORE_NOTIFICATION = 'START_LOAD_MORE_NOTIFICATION'
const STOP_LOAD_MORE_NOTIFICATION = 'STOP_LOAD_MORE_NOTIFICATION'
const MARK_NOTIFY_AS_READ = 'MARK_NOTIFY_AS_READ'
const MARK_ALL_NOTIFY_AS_READ = 'MARK_ALL_NOTIFY_AS_READ'
const ADD_NOTIFY = 'ADD_NOTIFY'
const DELETE_NOTIFY = 'DELETE_NOTIFY'
const CLEAR_ALL_NOTIFY = 'CLEAR_ALL_NOTIFY'
const UPDATE_DATA_NOTIFY = 'UPDATE_DATA_NOTIFY'

export const notifyAction = {
  START_GET_LIST_NOTIFICATION,
  STOP_GET_LIST_NOTIFICATION,
  START_LOAD_MORE_NOTIFICATION,
  STOP_LOAD_MORE_NOTIFICATION,
  MARK_NOTIFY_AS_READ,
  MARK_ALL_NOTIFY_AS_READ,
  ADD_NOTIFY,
  DELETE_NOTIFY,
  CLEAR_ALL_NOTIFY,
  UPDATE_DATA_NOTIFY
}

export const add_notify = ({
  notify_id = '',
  notify_detail_id,
  notify_type,
  title,
  message,
  time_created = new Date().toISOString(),
  isRead = false
}) => {
  return {
    type: ADD_NOTIFY,
    notify: {
      notify_id,
      notify_detail_id,
      notify_type,
      title,
      message,
      time_created,
      isRead
    }
  }
}

export const getDataNotification = () => (dispatch, getState) => {
  dispatch(start_get_list_notification())
  getItem(STORAGE_CONST.NOTIFICATIONS)
    .then((res) => JSON.parse(res))
    .then((dataNotify) => {
      if (helper.isNonEmptyArray(dataNotify)) {
        dispatch(
          stop_get_list_notification({
            dataNotify: dataNotify.reverse(),
            isLoadMore: true
          })
        )
      } else
        dispatch(
          stop_get_list_notification({
            dataNotify: [],
            isLoadMore: true,
            isEmpty: true
          })
        )
    })
    .catch((err) =>
      dispatch(
        stop_get_list_notification({
          dataNotify: [],
          isLoadMore: true,
          isEmpty: true,
          message: err.message,
          isError: true
        })
      )
    )
}

export const getMoreDataNotification = () => (dispatch, getState) => {
  const curDataNotify = getState().notifyReducer.dataNotify
  const body = {
    accessToken: '',
    filters: [
      {
        property: 'last_notify_id',
        value: curDataNotify[curDataNotify.length - 1]
      }
    ],
    pageSize: 10
  }
  let isLoadMore = true
  let isEmpty = true
  let isError = true
  dispatch(start_load_more_notification())
  //   apiBase(API_GET_LIST_NOTIFICATION, METHOD.POST, body)
  //     .then((response) => {
  //       console.log('\nGET_MORE_DATA_NOTIFY_SUCCESS: ', response)
  //       const {object} = response
  //       if (helper.IsNonEmptyArray(object?.data)) {
  //         const {data} = object
  //         isLoadMore = data.length == 10
  //         dispatch(
  //           stop_load_more_notification([...curDataNotify, ...data], isLoadMore)
  //         )
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('\nGET_MORE_DATA_NOTIFY_ERROR: ', error)
  //       isLoadMore = false
  //       dispatch(stop_load_more_notification(curDataNotify, isLoadMore, isError))
  //     })
}

const start_get_list_notification = () => {
  return {type: START_GET_LIST_NOTIFICATION}
}

const stop_get_list_notification = ({
  dataNotify,
  isLoadMore,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_GET_LIST_NOTIFICATION,
    dataNotify,
    isLoadMore,
    isEmpty,
    message,
    isError
  }
}

const start_load_more_notification = () => {
  return {type: START_LOAD_MORE_NOTIFICATION}
}

const stop_load_more_notification = ({
  dataNotify,
  isLoadMore,
  isError = false
}) => {
  return {
    type: STOP_LOAD_MORE_NOTIFICATION,
    dataNotify,
    isLoadMore,
    isError
  }
}

export const mark_notify_as_read = (notifyIndex) => (dispatch, getState) => {
  let dataNotify = getState().notifyReducer.dataNotify
  dataNotify[notifyIndex].isRead = true
  setItem(NOTIFICATIONS, JSON.stringify(dataNotify.reverse()))
  dispatch({
    type: UPDATE_DATA_NOTIFY,
    dataNotify
  })
}

export const mark_all_notify_as_read = () => {
  return {
    type: MARK_ALL_NOTIFY_AS_READ
  }
}

export const delete_notify = (notifyIndex) => (dispatch, getState) => {
  let dataNotify = getState().notifyReducer.dataNotify
  dataNotify.splice(notifyIndex, 1)
  setItem(NOTIFICATIONS, JSON.stringify(dataNotify.reverse()))
  dispatch({
    type: UPDATE_DATA_NOTIFY,
    dataNotify
  })
}

export const clear_all_notify = () => (dispatch, getState) => {
  setItem(NOTIFICATIONS, JSON.stringify([]))
  dispatch({
    type: UPDATE_DATA_NOTIFY,
    dataNotify: []
  })
}
