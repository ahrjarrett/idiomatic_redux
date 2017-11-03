import { combineReducers } from 'redux'
import todos, * as fromTodos from './todos'

const todoApp = combineReducers({
  todos,
})

export default todoApp

/* this is the selector, where we would make any changes
 * to the shape of our state (should it need to change
 * in the future). */
export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter)
