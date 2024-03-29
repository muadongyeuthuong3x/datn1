import { combineReducers } from 'redux'

import loginWeb from './login';
import listUsers from './users';
import listSubjects from './subject'
import listExam from './exam'
import listExamForm from './examForm'
import listTeacher from './teacher'
import listRoom from './room'
import listSchedule from './scheduleTest'
import listExamBlockForm from './examBlock'
import listScoreStudent from './editScore'
import ttScoreStudent from './scoreStatic'
import listDepartment from './department'
const rootReducer = combineReducers({
  login: loginWeb,
  listUsers: listUsers,
  listSubjects: listSubjects,
  listExam: listExam,
  listExamForm: listExamForm,
  listTeacher: listTeacher,
  listRoom : listRoom,
  listSchedule:listSchedule,
  listExamBlock: listExamBlockForm,
  listScoreStudent : listScoreStudent,
  ttScoreStudent:ttScoreStudent,
  listDepartment : listDepartment
})

export default rootReducer
