import createSagaMiddleware from 'redux-saga'
import promiseMiddleware from 'redux-promise'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { all } from 'redux-saga/effects'
import Logger from 'utilities/Logger'

// saga helper
// import { createPathChangeSagaWatcher } from 'saga'

// sagaWatcher
import dashboard, { dashboardSagaWatcher } from 'models/dashboard'

/** --------------------------------------------------------
 *
 * Combine reducer - rootReducer
 */
const rootReducer = combineReducers({
  router: routerReducer,
  form: formReducer,
  // add imported model
  dashboard
})

/** --------------------------------------------------------
 *
 * Combine saga - rootSaga
 * to scroll to top when path changes
 */
// const pathChangeSagaWatcher = createPathChangeSagaWatcher({
//   '*': function * () {
//     console.log('you changed to another path')
//   }
// })

function * rootSaga () {
  yield all([
    // add MODEL_NAME
    ...dashboardSagaWatcher
  ])
}

/** --------------------------------------------------------
 *
 * Combine middleware - rootMiddleware
 */
// configure reduxRouterMiddleware
export const history = createHistory()
const reduxRouterMiddleware = routerMiddleware(history)

// configure sagaMiddleware
const sagaMiddleware = createSagaMiddleware()

// combine middleware
let rootMiddleware
if (process.env.NODE_ENV !== 'production') {
  // non-prod env
  const { composeWithDevTools } = require('redux-devtools-extension')
  rootMiddleware = composeWithDevTools(applyMiddleware(
    sagaMiddleware,
    promiseMiddleware,
    reduxRouterMiddleware,
    Logger
  ))
} else {
  // prod env
  rootMiddleware = applyMiddleware(
    sagaMiddleware,
    promiseMiddleware,
    reduxRouterMiddleware
  )
}

/** --------------------------------------------------------
 *
 * App Default State
 */

// export appDefaultState as well
export const appDefaultState = {}

/** --------------------------------------------------------
 *
 * END
 */

// create store
const store = createStore(rootReducer, appDefaultState, rootMiddleware)

// run rootSaga
sagaMiddleware.run(rootSaga)

// export store
export default store
