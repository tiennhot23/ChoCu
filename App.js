import React from 'react'
import {Provider as ReduxProvider} from 'react-redux'
import Main from './src/app'
import store from './src/store'

const App = () => {
  return (
    <ReduxProvider store={store}>
      <Main />
    </ReduxProvider>
  )
}

export default App
