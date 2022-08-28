import {adminServicesManagerAction} from './action'
import {adminServicesManagerState} from './state'

const adminServicesManagerReducer = (
  state = adminServicesManagerState,
  action
) => {
  switch (action.type) {
    case 'RESET_STATE': {
      return {
        ...state,
        servicesState: {
          ...state.servicesState,
          isActioning: false,
          isActionDone: false
        }
      }
    }
    case adminServicesManagerAction.START_REQUEST_POST_TURN_SERVICES: {
      return {
        ...state,
        servicesData: [],
        servicesState: {
          isActioning: true,
          isActionDone: false,
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    }
    case adminServicesManagerAction.STOP_REQUEST_POST_TURN_SERVICES: {
      return {
        ...state,
        servicesData: action.servicesData,
        servicesState: {
          isActioning: false,
          isActionDone: action.isActionDone,
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        }
      }
    }
    default:
      return state
  }
}

export {adminServicesManagerReducer}
