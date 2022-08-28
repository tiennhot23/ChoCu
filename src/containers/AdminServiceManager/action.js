import {helper} from '@common'
import {
  apiBase,
  CONTENT_TYPE_MULTIPART,
  METHOD_GET,
  METHOD_POST
} from 'src/common/api'
import {
  API_REQUEST_POST_TURN_SERVICES,
  API_REQUEST_ADD_POST_TURN_SERVICES,
  API_REQUEST_UPDATE_POST_TURN_SERVICES,
  API_REQUEST_DELETE_POST_TURN_SERVICES
} from 'src/constants/api'

const START_REQUEST_POST_TURN_SERVICES = 'START_REQUEST_POST_TURN_SERVICES'
const STOP_REQUEST_POST_TURN_SERVICES = 'STOP_REQUEST_POST_TURN_SERVICES'

export const adminServicesManagerAction = {
  START_REQUEST_POST_TURN_SERVICES,
  STOP_REQUEST_POST_TURN_SERVICES
}

export const requestPostTurnServices = () => async (dispatch, getState) => {
  dispatch(startRequestPostTurnServices())
  apiBase(API_REQUEST_POST_TURN_SERVICES, METHOD_GET)
    .then(async (response) => {
      if (helper.isNonEmptyArray(response.data)) {
        dispatch(stopRequestPostTurnServices({servicesData: response.data}))
      } else {
        dispatch(
          stopRequestPostTurnServices({
            servicesData: [],
            message: response.message,
            isEmpty: true
          })
        )
      }
    })
    .catch((err) => {
      dispatch(
        stopRequestPostTurnServices({
          servicesData: [],
          isEmpty: true,
          message: err.message,
          isError: true
        })
      )
    })
}

export const addService =
  ({service_name, post_turn, description, price}) =>
  async (dispatch, getState) => {
    let servicesData = [...getState().adminServicesManagerReducer.servicesData]
    dispatch(startRequestPostTurnServices())
    apiBase(API_REQUEST_ADD_POST_TURN_SERVICES, METHOD_POST, {
      service_name,
      post_turn,
      description,
      price
    })
      .then(async (response) => {
        const {data} = response
        if (helper.isNonEmptyArray(response.data)) {
          servicesData.push(data[0])
          dispatch(
            stopRequestPostTurnServices({servicesData, isActionDone: true})
          )
        } else {
          dispatch(
            stopRequestPostTurnServices({
              servicesData,
              message: response.message
            })
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopRequestPostTurnServices({
            servicesData,
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const updateService =
  ({service_id, service_name, post_turn, description, price}) =>
  async (dispatch, getState) => {
    let servicesData = [...getState().adminServicesManagerReducer.servicesData]
    dispatch(startRequestPostTurnServices())
    apiBase(
      API_REQUEST_UPDATE_POST_TURN_SERVICES + `/${service_id}`,
      METHOD_POST,
      {service_name, post_turn, description, price}
    )
      .then(async (response) => {
        const {data} = response
        if (helper.isNonEmptyArray(response.data)) {
          servicesData = servicesData.map((e) => {
            if (e.service_id === service_id) {
              e = data[0]
            }
            return e
          })
          dispatch(
            stopRequestPostTurnServices({servicesData, isActionDone: true})
          )
        } else {
          dispatch(
            stopRequestPostTurnServices({
              servicesData,
              message: response.message
            })
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopRequestPostTurnServices({
            servicesData,
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const deleteService =
  ({service_id}) =>
  async (dispatch, getState) => {
    let servicesData = [...getState().adminServicesManagerReducer.servicesData]
    dispatch(startRequestPostTurnServices())
    apiBase(
      API_REQUEST_DELETE_POST_TURN_SERVICES + `/${service_id}`,
      METHOD_POST
    )
      .then(async (response) => {
        const {data} = response
        if (helper.isNonEmptyArray(response.data)) {
          servicesData = servicesData.filter((e) => e.service_id != service_id)
          dispatch(
            stopRequestPostTurnServices({servicesData, isActionDone: true})
          )
        } else {
          dispatch(
            stopRequestPostTurnServices({
              servicesData,
              message: response.message
            })
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopRequestPostTurnServices({
            servicesData,
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const startRequestPostTurnServices = () => {
  return {
    type: START_REQUEST_POST_TURN_SERVICES
  }
}

export const stopRequestPostTurnServices = ({
  servicesData,
  isActionDone = false,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_REQUEST_POST_TURN_SERVICES,
    servicesData,
    isActionDone,
    isEmpty,
    message,
    isError
  }
}
