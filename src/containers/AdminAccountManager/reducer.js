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
      let usersData = [...state.usersData]
      if (action.accountData?.account_id) {
        usersData = usersData.map((e) => {
          if (e.account_id === action.accountData.account_id) {
            e.active = action.accountData.active
          }
          return e
        })
      }
      return {
        ...state,
        accountData: action.accountData,
        accountState: {
          isActionDone: action.isActionDone,
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        },
        usersData: usersData
      }
    }
    case adminAccountManagerAction.START_REQUEST_USERS: {
      return {
        ...state,
        usersData: [],
        usersState: {
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    }
    case adminAccountManagerAction.STOP_REQUEST_USERS: {
      return {
        ...state,
        usersData: action.usersData,
        usersState: {
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
