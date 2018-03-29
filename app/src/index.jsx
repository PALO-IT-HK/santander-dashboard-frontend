import React from 'react'
import { render } from 'react-dom'
import 'babel-polyfill'
import { Provider } from 'react-redux'
import store from 'store'
import App from 'router'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { PUBLIC_PATH } from 'api'

// Base stylesheet
import 'assets/css/global.css'

const renderApp = Component => {
  return render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter basename={PUBLIC_PATH}>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>
    , document.getElementById('app')
  )
}

// Hot reload
const initApp = () => {
  renderApp(App)

  module.hot && module.hot.accept('router', () => {
    const NextApp = require('router').default
    renderApp(NextApp)
  })
}

initApp()
