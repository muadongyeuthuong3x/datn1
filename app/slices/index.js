import { combineReducers } from 'redux'

import listSchedule from './scheduleTest'
const rootReducer = combineReducers({
  listSchedule:listSchedule,
})

export default rootReducer
