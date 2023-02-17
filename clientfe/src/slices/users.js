import { createSlice } from '@reduxjs/toolkit'
import instance from '../configApi/axiosConfig'
import { toast } from 'react-toastify'
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
        loaddingFailes: state => {
            state.loading = false
        },
        createUserReducer: (state, { payload }) => {
            state.loading = false
            const dataOld = [...state.data];
            delete payload.password;
            dataOld.push(payload)
            state.data = dataOld
        },
        searchData: (state, { payload }) => {
            state.loading = false
            state.data = payload
        },
        editData: (state, { payload }) => {
            state.loading = false
            const dataOld = state.data
            const { name , role ,email } = payload;
            const indexEdit = dataOld.findIndex(item => item.email === email);
            dataOld[indexEdit].name = name;
            dataOld[indexEdit].role = role
            state.data = dataOld
        },
    },
})

export const { loadding, getListUserSuccess, deleteUserInList, loaddingFailes, createUserReducer, searchData ,editData } = listUsers.actions

export function apiGetListUsers(alert) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const response = await instance.get('/users');
            dispatch(getListUserSuccess(response.data))
          
        } catch (error) {
            alert.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export function deleteItemUser(id) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const response = await instance.delete(`/users/${id}`);
            if (response) {
                dispatch(deleteUserInList(id))
            }
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}


export function createUser(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const dataRes = await instance.post(`/users`, data);
            toast.success(dataRes.data.message)
            dispatch(createUserReducer(data))
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
            const dataRes = await instance.post(`/users/search`, { email: data });
            dispatch(searchData(dataRes.data))
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}



export function editDataUserApi(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const dataRes = await instance.put(`/users/edit`, data);
            dispatch(editData(data))
            toast.error(dataRes.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export const postsSelector = state => state.posts
export default listUsers.reducer