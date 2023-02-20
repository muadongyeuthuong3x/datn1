import { createSlice } from '@reduxjs/toolkit'
import instance from '../configApi/axiosConfig'
import { toast } from 'react-toastify'
export const initialState = {
    loading: false,
    data: []
}



const listExam = createSlice({
    name: 'getListExam',
    initialState,
    reducers: {
        loadding: state => {
            state.loading = true
        },
        getListExamSuccess: (state, { payload }) => {
            state.loading = false
            state.data = payload
        },
        deleteExamList: (state, { payload }) => {
            state.loading = false
            const dataOld = [...state.data];
            const dataAfterDelete = dataOld.filter(item => item.id !== payload);
            state.data = dataAfterDelete
        },
        loaddingFailes: state => {
            state.loading = false
        },
        createExamReducer: (state, { payload }) => {
            state.loading = false
            const dataOld = [...state.data];
            const {id , name} = payload;
            dataOld.push({
                id: id ,
                name: name
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
            const { name , id } = payload;
            const indexEdit = dataOld.findIndex(item => item.id === id);
            dataOld[indexEdit].name = name;
            state.data = dataOld
        },
    },
})

export const { loadding, getListExamSuccess, deleteExamList, loaddingFailes, createExamReducer, searchData ,editData } = listExam.actions

export function apiGetListExam(alert) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const response = await instance.get('/exam');
            
            dispatch(getListExamSuccess(response.data))
          
        } catch (error) {
            alert.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export function deleteItemExam(id) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const response = await instance.delete(`/exam/${id}`);
            if (response) {
                dispatch(deleteExamList(id))
            }
            toast.success("Xóa thành công")
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}


export function createExam(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const dataRes = await instance.post(`/exam`, data);
            toast.success("Tạo thành công")
            console.log(dataRes.data)
            dispatch(createExamReducer(dataRes.data.message))
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
            const dataRes = await instance.post(`/exam/search`, { name: data });
            dispatch(searchData(dataRes.data))
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}



export function editDataExamApi(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const {id , name} = data
            const dataRes = await instance.patch(`/exam/${id}`, {name});
            dispatch(editData(data))
            toast.success(dataRes.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export const postsSelector = state => state.posts
export default listExam.reducer