import { combineReducers } from 'redux'
import {
  ADD_TODO,
  UPDATE_PROFILE,
} from './actions'

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    default:
      return state
  }
}

function userInfo(state = null, action) {
  switch (action.type) {
    case UPDATE_PROFILE:
      let retVal =  Object.assign({}, state, {
        profile: action.input,
      });
      return retVal;
    default:
      return state;
  }
}

const todoApp = combineReducers({
  todos,
  userInfo
})

export default todoApp
