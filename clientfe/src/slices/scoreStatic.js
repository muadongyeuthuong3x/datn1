import { createSlice } from '@reduxjs/toolkit'
import instance from '../configApi/axiosConfig'
import { toast } from 'react-toastify'
export const initialState = {
    loading: false,
    data: []
}



const ttScoreStudent = createSlice({
    name: 'getListScore',
    initialState,
    reducers: {
        loadding: state => {
            state.loading = true
        },
        getListCountScoreSuccess: (state, { payload }) => {
            state.loading = false
            state.data = payload
        },
        loaddingFailes: state => {
            state.loading = false
        },
    },
})

export const { loadding, getListCountScoreSuccess, loaddingFailes} = ttScoreStudent.actions

export function apiGetListCountScore(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const response = await instance.post('/students/tt-score-studnet' ,data);
            dispatch(getListCountScoreSuccess(response.data.message))
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
} 



export const postsSelector = state => state.posts
export default ttScoreStudent.reducer