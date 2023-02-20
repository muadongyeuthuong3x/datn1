import { combineReducers } from 'redux'

import loginWeb from './login';
import listUsers from './users';
import listSubjects from './subject'

const rootReducer = combineReducers({
  login: loginWeb,
  listUsers: listUsers,
  listSubjects : listSubjects
})

export default rootReducer
