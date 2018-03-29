import { takeEvery } from 'redux-saga/effects'
import { mapValues, reduce } from 'lodash'

/**
 * Used in models, follow Ducks & redux-act conventions.
 * The created sagaWatcher should be exported as a constant to be used by rootSaga.
 *
 * -----------------------------------
 * modelA.js
 * -----------------------------------
 * import { createAction } from 'redux-act'
 * import { createSagaWatcher } from 'falcon'
 *
 * export const add = createAction('add something')
 *
 * export const saga = {
 *   [add]: function * (action) {
 *     // do some async stuff here...
 *   }
 * }
 *
 * export const sagaWatcher = createSagaWatcher(saga)
 *
 * -----------------------------------
 * store.js
 * -----------------------------------
 * import { sagaWatcher as modelASagaWatcher } from 'models/modelA'
 *
 * function * rootSaga () {
 *   yield [
 *     ...modelASagaWatcher
 *   ]
 * }
 */
export const createSagaWatcher = sagas => Object
  .keys(sagas)
  .map(type => (function * () { yield takeEvery(type, sagas[type]) })())

/**
 * Prerequisite:
 * - react-router-redux is properly configured
 *
 * --------------------------------------
 * import { createPathSagaWatcher } from 'falcon'
 *
 * const pathSaga = createPathSaga({
 *   '*': function * () {}
 *   '/path1': function * () {},
 *   '/path2': function * () {}
 * })
 */
export const createPathChangeSagaWatcher = props => createSagaWatcher({
  '@@router/LOCATION_CHANGE': function * ({payload: { pathname }}) {
    // get registered genFunction
    const func = props[pathname]
    // get universal genFunction
    const universalFunc = props['*']

    // run
    if (func) yield func()
    if (universalFunc) yield universalFunc()
  }
})

/**
 * example: this guard will stop dispatching add action
 * to redux if payload is not a number
 *
 * -----------------------------------------------
 * modelA.js
 * -----------------------------------------------
 * export const guard = {
 *   [add]: (state, payload) => (state === 0)
 * }
 *
 * -----------------------------------------------
 * store.js
 * -----------------------------------------------
 * import { createGuardMiddleware } from 'falcon'
 *
 * import { guard: modelAGuard } from 'models/modelA'
 *
 * const guardMiddleware = createGuardMiddleware({
 *    modelA: modelAGuard
 * })
 *
 */
export const createGuardMiddleware = props =>
// redux middleware
  store => next => action => {
    const guardsWip = mapValues(props, (v, k) => mapValues(v, (sv, sk) => ({
      func: sv,
      name: k
    })))
    const guards = reduce(guardsWip, (result, v) => ({...result, ...v}), {})

    const { type, payload } = action
    const { func: guardFunc, name: storeName } = (guards[type] || {})

    if (typeof guardFunc === 'function') {
      // get state
      const state = store.getState()[storeName]
      if (guardFunc(state, payload)) {
        next(action)
      }
    } else {
      next(action)
    }
  }
