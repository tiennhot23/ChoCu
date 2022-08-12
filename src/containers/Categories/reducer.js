import {categoriesAction} from './action'
import {categoriesState} from './state'

const categoriesReducer = (state = categoriesState, action) => {
  switch (action.type) {
    case categoriesAction.START_GET_CATEGORIES:
      return {
        ...state,
        dataCategories: [],
        stateCategories: {
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    case categoriesAction.STOP_GET_CATEGORIES:
      return {
        ...state,
        dataCategories: action.categories,
        stateCategories: {
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        }
      }
    case categoriesAction.START_GET_DETAILS:
      return {
        ...state,
        stateDetails: {
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    case categoriesAction.STOP_GET_DETAILS:
      let newData = state.dataCategories
      if (!action.isError)
        newData = newData.map((item) =>
          item.category_id === action.category_id
            ? {...item, details: action.details}
            : item
        )
      return {
        ...state,
        dataCategories: newData,
        stateDetails: {
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

export {categoriesReducer}
