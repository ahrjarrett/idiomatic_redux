import { v4 } from 'uuid'

let nextTodoId = 0
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text,
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
})
