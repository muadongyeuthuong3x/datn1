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
        }
    },
})

export const { loadding, getListScoreSuccess, loaddingFailes } = listScoreStudent.actions

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

export const postsSelector = state => state.posts
export default listScoreStudent.reducer