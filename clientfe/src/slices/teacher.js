import { createSlice } from '@reduxjs/toolkit'
import instance from '../configApi/axiosConfig'
import { toast } from 'react-toastify'
import {UploadMuitiFie} from "../uploadImage/index"
export const initialState = {
    loading: false,
    data: []
}



const listTeacher = createSlice({
    name: 'getListTeacher',
    initialState,
    reducers: {
        loadding: state => {
            state.loading = true
        },
        getListTeacherSuccess: (state, { payload }) => {
            state.loading = false
            state.data = payload
        },
        deleteTeacherInList: (state, { payload }) => {
            state.loading = false
            const dataOld = [...state.data];
            const dataAfterDelete = dataOld.filter(item => item.id !== payload);
            state.data = dataAfterDelete
        },
        loaddingFailes: state => {
            state.loading = false
        },
        createTeacherReducer: (state, { payload }) => {
            state.loading = false
            const dataOld = [...state.data];
            const { id, name,
                id_teacher,
                avatar,
                phone_number } = payload;
            dataOld.push({
                id: id,
                name: name,
                id_teacher:id_teacher,
                phone_number:phone_number,
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
    },
})

export const { loadding, getListTeacherSuccess, deleteTeacherInList, loaddingFailes, createTeacherReducer, searchData, editData } = listTeacher.actions

export function apiGetListTeacherApi(alert) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const response = await instance.get('/teacher');

            dispatch(getListTeacherSuccess(response.data))

        } catch (error) {
            alert.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export function deleteItemTeacherApi(id) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const response = await instance.delete(`/teacher/${id}`);
            if (response) {
                dispatch(deleteTeacherInList(id))
                toast.success("Xóa dữ liệu thành công");
            }
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}


export function createTeacherApi(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const urlImage = await UploadMuitiFie(data?.avatar);
            const formUpload = {...data}
            formUpload.avatar = urlImage[0];
            const dataRes = await instance.post(`/teacher`, formUpload);
            if (dataRes) {
                dispatch(createTeacherReducer(dataRes.data.message))
                toast.success("Tạo thành công");
            }
          
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
            const dataRes = await instance.post(`/teacher/search`, { name : data });
            dispatch(searchData(dataRes.data))
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}



export function editDataTeacherApi(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const { id , avatar_new  } = data
            let formUpload = {...data}
            if(!!avatar_new){
                const urlImage = await UploadMuitiFie(data?.avatar_new);
                formUpload.avatar = urlImage[0];
            }
            delete formUpload.avatar_new
            const dataRes = await instance.patch(`/teacher/${id}`,  formUpload );
            dispatch(editData(data))
            toast.success(dataRes.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export const postsSelector = state => state.posts
export default listTeacher.reducer