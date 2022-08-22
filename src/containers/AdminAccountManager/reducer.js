import {adminAccountManagerAction} from './action'
import {adminAccountManagerState} from './state'

const adminAccountManagerReducer = (
  state = adminAccountManagerState,
  action
) => {
  switch (action.type) {
    case adminAccountManagerAction.START_REQUEST_LOCK_ACCOUNT: {
      return {
        ...state,
        accountData: {},
        accountState: {
          isActionDone: false,
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    }
    case adminAccountManagerAction.STOP_REQUEST_LOCK_ACCOUNT: {
      return {
        ...state,
        accountData: action.accountData,
        accountState: {
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

export {adminAccountManagerReducer}
