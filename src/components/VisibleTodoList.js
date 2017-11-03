import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'ramda'
import { toggleTodo } from '../actions'
import TodoList from './TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos
    case 'active':
      return todos.filter(t => !t.completed)
    case 'completed':
      return todos.filter(t => t.completed)
    default:
      throw new Error(`Unknown filter: ${filter}.`)
  }
}

/* 'params' here is pulled off the "ownProps" argument,
 * made available by 'withRouter' */
const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(
    state.todos,
    params.filter || 'all'
  ),
})

/* When the arguments for the callback prop match
 * the arguments to the action creator exactly,
 * there is a shorter way to specify mapDispatchToProps
 * (see 2nd arg to connect below). */

//const mapDispatchToProps = (dispatch) => ({
//  onTodoClick(id) {
//    dispatch(toggleTodo(id))
//  },
//})

const VisibleTodoList = compose(
  withRouter,
  connect(
    mapStateToProps,
    { onTodoClick: toggleTodo }
  )
)(TodoList)

export default VisibleTodoList
