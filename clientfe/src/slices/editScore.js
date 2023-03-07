import { createSlice } from '@reduxjs/toolkit'
import instance from '../configApi/axiosConfig'
import { toast } from 'react-toastify'
export const initialState = {
    loading: false,
    data: []
}



const listScoreStudent = createSlice({
    name: 'getListScore',
    initialState,
    reducers: {
        loadding: state => {
            state.loading = true
        },
        getListScoreSuccess: (state, { payload }) => {
            state.loading = false
            state.data = payload
        },
        loaddingFailes: state => {
            state.loading = false
        },
        deleteIdStudent: (state, { payload }) => {
            state.loading = false
            const dataOld = [...state.data];
            const dataNew =  dataOld.filter(item=>item.id !==payload);
            state.data = dataNew
        },
        editDataScoreStudent: (state, { payload }) => {
            state.loading = false
            const dataOld = [...state.data];
            const {
                id , 
                point_diligence,
                point_beetween,
                point_end,
                point_end_end,
                why_edit_point_end_end,
                why_edit_point_end} = payload
            const index =  dataOld.findIndex(item=>item.id === id);
            dataOld[index].point_diligence = point_diligence
            dataOld[index].point_beetween = point_beetween
            dataOld[index].point_end = point_end
            dataOld[index].point_end_end = point_end_end
            dataOld[index].why_edit_point_end_end = why_edit_point_end_end
            dataOld[index].why_edit_point_end = why_edit_point_end
            state.data = dataOld
        },
    },
})

export const { loadding, getListScoreSuccess, loaddingFailes,deleteIdStudent,editDataScoreStudent } = listScoreStudent.actions

export function apiGetListExam() {
    return async dispatch => {
        dispatch(loadding())
        try {
            const response = await instance.get('/students');
            dispatch(getListScoreSuccess(response.data))
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export function searchDataListScoreStudent(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const response = await instance.post('/students/search-score' ,data);
            dispatch(getListScoreSuccess(response.data.message))
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export function deleteDataStudent(id) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const response = await instance.delete(`/students/${id}`);
            if(response){
                toast.success("Xóa điểm sinh viên thành công");
                dispatch(deleteIdStudent(id))
            }
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export function editScoreStudent(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const response = await instance.patch(`/students/${data.id}`,data);
            if(response){
                toast.success("Sửa điểm sinh viên thành công");
                dispatch(editDataScoreStudent(data))
            }
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export const postsSelector = state => state.posts
export default listScoreStudent.reducer