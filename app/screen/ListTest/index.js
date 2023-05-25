import React, { useState , useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import instance from '../../api';
import { useDispatch, useSelector } from 'react-redux'
import instance from '../configApi/axiosConfig'
import { apiGetListDataApi, setCountExamApiTl, callApiGetTeacherDepartment, createDataTestScheduleStudent, getAllTestScheduleStudent, deleteItemTestScheduleStudent } from '../slices/scheduleTest';
import { apiGetListExamBlock, callDataGetYear } from "../slices/examBlock";
import { apiGetListDepartment } from '../slices/department'
import { setCountExamApi } from "../slices/scheduleTest";

const ListTest = () => {
  
    const dispatch = useDispatch();
    const { data: listDepartment } = useSelector(state => state.listDepartment)
    const { rooms, examForms, teachers, countStudnetExam, teacher_department ,teacher_department_edit } = useSelector(state => state.listSchedule);
    const { dataOldSearchView, getYear } = useSelector(state => state.listExamBlock);
    const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
    const [listTeachers , setListTeachers] = useState([])

    const callListTeacher = async () =>{
        const res =   await instance.get('/teacher')
        setListTeachers(res.data);
      }
      useEffect(()=>{
          callListTeacher()
      },[])
      
      
    useEffect(() => {
        const dataOld = { ...onFormCreate };
        dataOld.form_exam = examForms[0]?.id;
        setOnchangeFormCreate(dataOld)
    }, [examForms])
    useEffect(() => {
        const dataOld = { ...onFormCreate };
        dataOld.form_exam = examForms[0]?.id;
        setOnchangeFormCreate(dataOld)
    }, [examForms])

    
    useEffect(() => {
        async function getData() {
            try {
                const dataRes = await instance.get(`/test-schedule-student`);
                // dispatch(setGetAllTestStudent(dataRes.data.message))
                setlistDataTestSchedule(dataRes.data.message)
            } catch (error) {

                toast.error(error.response.data.message)
            }

        }
        getData();
    }, [dispatch, callApiReset])

    useEffect(() => {
        dispatch(apiGetListExamBlock());
        dispatch(apiGetListDataApi());
        dispatch(apiGetListDepartment());
    }, [dispatch])


    useEffect(() => {
        idDepartment && dispatch(callApiGetTeacherDepartment(idDepartment, 'create'))
    }, [idDepartment])

    useEffect(() => {
        dataFormEdit.idDepartment && dispatch(callApiGetTeacherDepartment(dataFormEdit.idDepartment , 'edit'))
    }, [dataFormEdit.idDepartment])


    return (
        <View>
            <Text>List Test</Text>
        </View>
    )
}

export default ListTest;



