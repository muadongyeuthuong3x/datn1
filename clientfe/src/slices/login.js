import { createSlice } from '@reduxjs/toolkit'
import instance from '../configApi/axiosConfig'
export const initialState = {
    loading: false,
    hasErrors: false,
    datalogin: [],
}


const loginWeb = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        getPosts: state => {
            state.loading = true
        },
        getPostsSuccess: (state, { payload }) => {
            state.datalogin = payload
            state.loading = false
            state.hasErrors = false
        },
        getPostsFailure: state => {
            state.loading = false
            state.hasErrors = true
        },
    },
})

export function apiLoginWeb() {
    return async dispatch => {
        dispatch(getPosts())
        try {
            const response = await instance('/login')
            const data = await response.json()
            dispatch(getPostsSuccess(data))
        } catch (error) {
            dispatch(getPostsFailure())
        }
    }
}


export const { getPosts, getPostsSuccess, getPostsFailure } = loginWeb.actions
export const postsSelector = state => state.posts
export default loginWeb.reducer