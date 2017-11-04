import { createStore } from 'redux'
import todoApp from './reducers'
import throttle from 'lodash/throttle'
import { loadState, saveState } from './localStorage'

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch
  if(!console.group) return rawDispatch

  return (action) => {
    console.group(action.type)
    console.log('%c previous state', 'color:gray', store.getState())
    console.log('%c action', 'color:blue', action)
    const returnValue = rawDispatch(action)
    console.log('%c next state', 'color:green', store.getState())
    console.groupEnd(action.type)
    return returnValue
  }
}

/* exporting configureStore separately is helpful
 * because we can create as many instances of the store
 * for purposes of testing. */
const configureStore = () => {
  const persistedState = loadState()
  const store = createStore(todoApp, persistedState)

  if(process.env.NODE_ENV !== 'production')
    addLoggingToDispatch(store)

  /* when store changes, save state to localStorage;
   * in order not to pass UI state (visibility filter),
   * we specify that only the todos portion of state be saved. */
  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos
    })
  }, 1000))

  return store
}

export default configureStore
