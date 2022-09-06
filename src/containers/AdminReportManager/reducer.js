import {adminReportsManagerAction} from './action'
import {adminReportsManagerState} from './state'

const adminReportsManagerReducer = (
  state = adminReportsManagerState,
  action
) => {
  switch (action.type) {
    case adminReportsManagerAction.START_REQUEST_REPORTS: {
      return {
        ...state,
        reportsData: [],
        reportsState: {
          isActionDone: false,
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    }
    case adminReportsManagerAction.STOP_REQUEST_REPORTS: {
      return {
        ...state,
        reportsData: action.reportsData,
        reportsState: {
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

export {adminReportsManagerReducer}
