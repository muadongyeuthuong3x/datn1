import { createSlice } from '@reduxjs/toolkit'
import instance from '../configApi/axiosConfig'
import { toast } from 'react-toastify'
export const initialState = {
    loading: false,
    data: []
}



const listSubjects = createSlice({
    name: 'getListSubject',
    initialState,
    reducers: {
        loadding: state => {
            state.loading = true
        },
        getListSubjectSuccess: (state, { payload }) => {
            state.loading = false
            state.data = payload
        },
        deleteSubjectInList: (state, { payload }) => {
            state.loading = false
            const dataOld = [...state.data];
            const dataAfterDelete = dataOld.filter(item => item.id !== payload);
            state.data = dataAfterDelete
        },
        loaddingFailes: state => {
            state.loading = false
        },
        createSubjectReducer: (state, { payload }) => {
            state.loading = false
            const dataOld = [...state.data];
            const {id , bigBlockClass} = payload;
            dataOld.push({
                id: id ,
                bigBlockClass: bigBlockClass
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
            const { bigBlockClass , id } = payload;
            const indexEdit = dataOld.findIndex(item => item.id === id);
            dataOld[indexEdit].bigBlockClass = bigBlockClass;
            state.data = dataOld
        },
    },
})

export const { loadding, getListSubjectSuccess, deleteSubjectInList, loaddingFailes, createSubjectReducer, searchData ,editData } = listSubjects.actions

export function apiGetListSubject(alert) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const response = await instance.get('/big-block-class');
            
            dispatch(getListSubjectSuccess(response.data))
          
        } catch (error) {
            alert.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export function deleteItemSubject(id) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const response = await instance.delete(`/big-block-class/${id}`);
            if (response) {
                dispatch(deleteSubjectInList(id))
            }
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}


export function createSubject(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const dataRes = await instance.post(`/big-block-class`, data);
            toast.success(dataRes.data.message)
            dispatch(createSubjectReducer(dataRes.data.message))
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
            const dataRes = await instance.post(`/big-block-class/search`, { bigBlockClass: data });
            dispatch(searchData(dataRes.data))
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}



export function editDataSubjectApi(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const {id , bigBlockClass} = data
            const dataRes = await instance.patch(`/big-block-class/${id}`, {bigBlockClass});
            dispatch(editData(data))
            toast.success(dataRes.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export const postsSelector = state => state.posts
export default listSubjects.reducer