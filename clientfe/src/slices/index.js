import { combineReducers } from 'redux'

import loginWeb from './login';
import listUsers from './users';
import listSubjects from './subject'
import listExam from './exam'
import listExamForm from './examForm'
const rootReducer = combineReducers({
  login: loginWeb,
  listUsers: listUsers,
  listSubjects: listSubjects,
  listExam: listExam,
  listExamForm: listExamForm
})

export default rootReducer
