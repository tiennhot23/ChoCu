const START_REQUEST_AUTH_TOKEN = 'START_REQUEST_AUTH_TOKEN'
const STOP_REQUEST_AUTH_TOKEN = 'STOP_REQUEST_AUTH_TOKEN'

export const loginAction = {
  START_REQUEST_AUTH_TOKEN,
  STOP_REQUEST_AUTH_TOKEN
}

export const requestAuthToken = (data) => (dispatch, getState) => {
  //init body
  dispatch(startRequestAuthToken())
  //fetch api
  /**
   * case success:
   *    save token
   *    get token to call api to request notify token fcm
   *    if access token is invalid dispatch(stopRequestAuthToken())
   * case error:
   *    dispatch(stopRequestAuthToken())
   *  */
}

export const requestNotifyToken = (body) => (dispatch, getState) => {
  //call api to request notify token
}

const startRequestAuthToken = () => {
  return {
    type: START_REQUEST_AUTH_TOKEN
  }
}

const stopRequestAuthToken = ({ message, isError }) => {
  return {
    type: STOP_REQUEST_AUTH_TOKEN,
    message: message,
    isError: isError
  }
}
