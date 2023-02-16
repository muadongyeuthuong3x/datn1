import { combineReducers } from 'redux'

import loginWeb from './login'


const rootReducer = combineReducers({
  login: loginWeb,
})

export default rootReducer
