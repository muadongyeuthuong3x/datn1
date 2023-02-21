import { combineReducers } from 'redux'

import loginWeb from './login';
import listUsers from './users';
import listSubjects from './subject'
import listExam from './exam'
import listExamForm from './examForm'
import listTeacher from './teacher'
import listRoom from './room'
const rootReducer = combineReducers({
  login: loginWeb,
  listUsers: listUsers,
  listSubjects: listSubjects,
  listExam: listExam,
  listExamForm: listExamForm,
  listTeacher: listTeacher,
  listRoom : listRoom
})

export default rootReducer
