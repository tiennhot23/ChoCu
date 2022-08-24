import {postTurnServicesAction} from './action'
import {postTurnServicesState} from './state'

const postTurnServicesReducer = (state = postTurnServicesState, action) => {
  switch (action.type) {
    case 'RESET_STATE':
      return {
        ...state,
        statePostTurnServices: {
          ...state.statePostTurnServices,
          isActioning: false,
          isActionDone: false
        }
      }
    case postTurnServicesAction.START_ACTION_ADD_USER_SERVICE:
      return {
        ...state,
        statePostTurnServices: {
          ...state.statePostTurnServices,
          isActioning: true,
          isActionDone: false
        }
      }
    case postTurnServicesAction.STOP_ACTION_ADD_USER_SERVICE:
      return {
        ...state,
        statePostTurnServices: {
          isActioning: false,
          isActionDone: action.isError ? false : true,
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        }
      }
    default:
      return state
  }
}

export {postTurnServicesReducer}
