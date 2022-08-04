const NAVIGATE_TO_LOGIN_SCREEN = 'NAVIGATE_TO_LOGIN_SCREEN'
const NAVIGATE_TO_MAIN_SCREEN = 'NAVIGATE_TO_MAIN_SCREEN'

export const appNavigateAction = {
  NAVIGATE_TO_LOGIN_SCREEN,
  NAVIGATE_TO_MAIN_SCREEN
}

export const navigateToMainScreen = function () {
  return function (dispatch, getState) {
    dispatch(navigate_to_main_screen())
  }
}

export const navigateToLoginScreen = function () {
  return function (dispatch, getState) {
    dispatch(navigate_to_login_screen())
  }
}

const navigate_to_login_screen = () => {
  return {
    type: NAVIGATE_TO_LOGIN_SCREEN
  }
}

const navigate_to_main_screen = () => {
  return {
    type: NAVIGATE_TO_MAIN_SCREEN
  }
}
