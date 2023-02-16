import { createSlice } from '@reduxjs/toolkit'
import instance from '../configApi/axiosConfig'
import {toast}  from 'react-toastify'
export const initialState = {
    loading: false,
    data: []
}
const listUsers = createSlice({
    name: 'getListUsers',
    initialState,
    reducers: {
        loadding: state => {
            state.loading = true
        },
        getListUserSuccess: (state, { payload }) => {
            state.loading = false
            state.data = payload
        },
        deleteUserInList: (state, { payload }) => {
            state.loading = false
            const dataOld = [...state.data];
            const dataAfterDelete = dataOld.filter(item => item.id !== payload);
            state.data = dataAfterDelete
        },
    },
})

export const { loadding, getListUserSuccess, deleteUserInList } = listUsers.actions

export function apiGetListUsers(alert) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const response = await instance.get('/users');
            dispatch(getListUserSuccess(response.data))
        } catch (error) {
            alert.error(error.response.data.message)
            dispatch(loadding())
        }
    }
}

export function deleteItemUser(id, alert) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const response = await instance.delete(`/users/${id}`);
            if (response) {
                dispatch(deleteUserInList(id))
            }
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loadding())
        }
    }
}


export const postsSelector = state => state.posts
export default listUsers.reducer