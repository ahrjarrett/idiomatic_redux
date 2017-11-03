import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'ramda'
import { getVisibleTodos } from '../reducers'
import { toggleTodo } from '../actions'
import TodoList from './TodoList'

/* 'params' here is pulled off the "ownProps" argument,
 * made available by 'withRouter' */
const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(
    state,
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
