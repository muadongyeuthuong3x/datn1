import { combineReducers } from 'redux'

import loginWeb from './login';
import listUsers from './users';


const rootReducer = combineReducers({
  login: loginWeb,
  listUsers: listUsers,
})

export default rootReducer
