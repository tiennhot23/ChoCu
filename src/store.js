import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {getAsyncStorage} from './initApp'
import rootReducer from './reducers/rootReducer'

const middlewares = [thunk]

if (__DEV__) {
  const loggerMiddleware = createLogger()
  middlewares.push(loggerMiddleware)
}

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store

store.dispatch(getAsyncStorage())
