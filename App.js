import React from 'react'
import Main from './src/app'
import {Provider as ReduxProvider} from 'react-redux'
import store from './src/store'

const App = () => {
  return (
    <ReduxProvider store={store}>
      <Main />
    </ReduxProvider>
  )
}

export default App
