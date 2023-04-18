import { createSlice } from '@reduxjs/toolkit'
import instance from '../configApi/axiosConfig'
import { toast } from 'react-toastify'
export const initialState = {
    loading: false,
    data: {
    dataAll : [],
    countFail : 0,
    countSuccess:0
    }
}



const ttScoreStudent = createSlice({
    name: 'ttScoreStudent',
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
        defaultData: state => {
            state.data = {
                dataAll: [],
                countFail: 0,
                countSuccess: 0
            }
        }
    },
})

export const { loadding, getListCountScoreSuccess, loaddingFailes, defaultData } = ttScoreStudent.actions

export function apiGetListCountScore(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const response = await instance.post('/students/tt-score-studnet' ,data);
            if(response){
                dispatch(getListCountScoreSuccess(response.data.message))
            }
        } catch (error) {
            dispatch(getListCountScoreSuccess({ dataAll : [0,0,0,0,0,0,0,0,0,0] , countFail : 0 , countSuccess: 0 }))
            toast.error(error.response.data.message)
        }
    }
} 


    // dataAll,
    // countFail,
    // countSuccess
export function dispatchDefault(){
    return async dispatch => {
        dispatch(defaultData())
    }
}




export const postsSelector = state => state.posts
export default ttScoreStudent.reducer