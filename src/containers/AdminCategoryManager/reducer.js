import {adminCategoriesManagerAction} from './action'
import {adminCategoriesManagerState} from './state'

const adminCategoriesManagerReducer = (
  state = adminCategoriesManagerState,
  action
) => {
  switch (action.type) {
    case adminCategoriesManagerAction.START_REQUEST_CATEGORY: {
      return {
        ...state,
        categoriesData: [],
        categoriesState: {
          isActioning: false,
          isActionDone: false,
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    }
    case adminCategoriesManagerAction.STOP_REQUEST_CATEGORY: {
      return {
        ...state,
        categoriesData: action.categoriesData,
        categoriesState: {
          isActioning: false,
          isActionDone: action.isActionDone,
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        }
      }
    }
    case adminCategoriesManagerAction.START_REQUEST_DETAILS: {
      return {
        ...state,
        detailsData: [],
        detailsState: {
          isActioning: false,
          isActionDone: false,
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    }
    case adminCategoriesManagerAction.STOP_REQUEST_DETAILS: {
      return {
        ...state,
        detailsData: action.detailsData,
        detailsState: {
          isActioning: false,
          isActionDone: action.isActionDone,
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        }
      }
    }
    case adminCategoriesManagerAction.START_REQUEST_CATE_DETAILS: {
      return {
        ...state,
        cateDetailsData: [],
        cateDetailsState: {
          isActioning: false,
          isActionDone: false,
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    }
    case adminCategoriesManagerAction.STOP_REQUEST_CATE_DETAILS: {
      return {
        ...state,
        cateDetailsData: action.cateDetailsData,
        cateDetailsState: {
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

export {adminCategoriesManagerReducer}
