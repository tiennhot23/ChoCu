import { loginState } from './state'
import { loginAction } from './action'

const loginReducer = (state = loginState, action) => {
  switch (action.type) {
    case loginAction.START_REQUEST_AUTH_TOKEN:
      return {
        isFetching: true,
        message: '',
        isError: false
      }
    case loginAction.STOP_REQUEST_AUTH_TOKEN:
      return {
        isFetching: false,
        message: action.message,
        isError: action.isError
      }
    default:
      return state
  }
}

export { loginReducer }
