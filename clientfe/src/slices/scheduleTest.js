import { createSlice, current } from '@reduxjs/toolkit'
import instance from '../configApi/axiosConfig'
import { toast } from 'react-toastify'
import { UploadMuitiFie } from "../uploadImage/index"
export const initialState = {
    loading: false,
    bigBlockClass: [],
    teachers: [],
    rooms: [],
    examForms: [],
    exams : [],
    countStudnetExam : 0,
    teacher_department : []
}



const listSchedule = createSlice({
    name: 'getListSchedule',
    initialState,
    reducers: {
        loadding: state => {
            state.loading = true
        },
        getListDataSuccess: (state, { payload }) => {
            state.loading = false
            const { roomExam, examForm, bigBlockClass, teacher  ,exams} = payload
            state.bigBlockClass = bigBlockClass
            state.rooms = roomExam
            state.examForms = examForm
            state.teachers = teacher
            state.exams = exams
        },
        deleteScheduleInList: (state, { payload }) => {
            state.loading = false
            const dataOld = [...state.data];
            const dataAfterDelete = dataOld.filter(item => item.id !== payload);
            state.data = dataAfterDelete
        },
        loaddingFailes: state => {
            state.loading = false
        },
        createScheduleReducer: (state, { payload }) => {
            state.loading = false
            const dataOld = [...state.data];
            const { id, name,
                id_teacher,
                avatar,
                phone_number } = payload;
            dataOld.push({
                id: id,
                name: name,
                id_teacher: id_teacher,
                phone_number: phone_number,
                avatar: avatar
            })
            state.data = dataOld
        },
        searchData: (state, { payload }) => {
            state.loading = false
            state.data = payload
        },
        editData: (state, { payload }) => {
            state.loading = false
            const dataOld = state.data
            const { id } = payload;
            const indexEdit = dataOld.findIndex(item => item.id === id);
            dataOld[indexEdit] = payload;
            state.data = dataOld
        },
        setCount: (state, { payload }) => {
            state.loading = false
            state.countStudnetExam = payload
        },
        setteacher_department : (state, { payload }) => {
            state.loading = false
            state.teacher_department = payload
        },
    },
})

export const { loadding, getListDataSuccess, deleteScheduleInList, loaddingFailes, createScheduleReducer, searchData, editData, setCount,setteacher_department } = listSchedule.actions

export function apiGetListDataApi(alert) {
    return async dispatch => {
        dispatch(loadding())
        try {
            await Promise.all([
                await instance.get('/room'),
                await instance.get('/exam-form'),
                await instance.get('/big-block-class'),
                await instance.get('/teacher'),
                await instance.get('/exam'),
            ]).then((res) => {
                const roomExam = res[0]?.data
                const examForm = res[1]?.data
                const bigBlockClass = res[2]?.data
                const teacher = res[3]?.data
                const exams = res[4]?.data
                const objectList = {
                    roomExam, examForm, bigBlockClass, teacher,exams
                }
                dispatch(getListDataSuccess(objectList))
            })
                .catch(error => console.log(error));


        } catch (error) {
            alert.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export function deleteItemScheduleApi(id) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const response = await instance.delete(`/teacher/${id}`);
            if (response) {
                dispatch(deleteScheduleInList(id))
                toast.success("Xóa dữ liệu thành công");
            }
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}


export function createScheduleApi(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const urlImage = await UploadMuitiFie(data?.avatar);
            const formUpload = { ...data }
            formUpload.avatar = urlImage[0];
            const dataRes = await instance.post(`/teacher`, formUpload);
            toast.success(dataRes.data.message)
            dispatch(createScheduleReducer(dataRes.data.message))
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export function searchDataApi(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const dataRes = await instance.post(`/teacher/search`, { name: data });
            dispatch(searchData(dataRes.data))
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}



export function editDataScheduleApi(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const { id, avatar_new } = data
            let formUpload = { ...data }
            if (!!avatar_new) {
                const urlImage = await UploadMuitiFie(data?.avatar_new);
                formUpload.avatar = urlImage[0];
            }
            delete formUpload.avatar_new
            const dataRes = await instance.patch(`/teacher/${id}`, formUpload);
            dispatch(editData(data))
            toast.success(dataRes.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export function setCountExamApi(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const { exam , time_start} = data
            const dataRes = await instance.get(`/students/count/${exam}/${time_start}`);
            dispatch(setCount(dataRes.data.message))
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export function setCountExamApiTl(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const { exam , time_start} = data
            const dataRes = await instance.get(`/students/count/tl/${exam}/${time_start}`);
            dispatch(setCount(dataRes.data.message))
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export function callApiGetTeacherDepartment(id){
    return async dispatch => {
        dispatch(loadding())
        try {
            const dataRes = await instance.get(`/department/query_teacher/${id}`);
            dispatch(setteacher_department(dataRes.data.idDepartment))
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}


export function canlenderApiExamStudent(id){
    return async dispatch => {
        dispatch(loadding())
        try {
            const dataRes = await instance.get(`/department/query_teacher/${id}`);
           if(dataRes){
            toast.success("Tạo dữ liệu thành công");
           }
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export const postsSelector = state => state.posts
export default listSchedule.reducer