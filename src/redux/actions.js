/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'

/*
 * action creators
 */

export function addTodo(text) {
  return { type: ADD_TODO, text };
}

export function updateProfile(input) {
  return { type: UPDATE_PROFILE, input };
}
