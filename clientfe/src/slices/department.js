import { createSlice } from '@reduxjs/toolkit'
import instance from '../configApi/axiosConfig'
import { toast } from 'react-toastify'
export const initialState = {
    loading: false,
    data: []
}



const listDepartment = createSlice({
    name: 'getListDepartment',
    initialState,
    reducers: {
        loadding: state => {
            state.loading = true
        },
        getListDepartmentSuccess: (state, { payload }) => {
            state.loading = false
            state.data = payload
        },
        deleteDepartmentList: (state, { payload }) => {
            state.loading = false
            const dataOld = [...state.data];
            const dataAfterDelete = dataOld.filter(item => item.id !== payload);
            state.data = dataAfterDelete
        },
        loaddingFailes: state => {
            state.loading = false
        },
        createDepartmentReducer: (state, { payload }) => {
            state.loading = false
            const dataOld = [...state.data];
            const {id , department} = payload;
            dataOld.push({
                id: id ,
                department: department
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
            const { department , id } = payload;
            const indexEdit = dataOld.findIndex(item => item.id === id);
            dataOld[indexEdit].department = department;
            state.data = dataOld
        },
    },
})

export const { loadding, getListDepartmentSuccess, deleteDepartmentList, loaddingFailes, createDepartmentReducer, searchData ,editData } = listDepartment.actions

export function apiGetListDepartment(alert) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const response = await instance.get('/department');
            dispatch(getListDepartmentSuccess(response.data))
        } catch (error) {
            alert.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export function deleteItemDepartment(id) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const response = await instance.delete(`/department/${id}`);
            if (response) {
                dispatch(deleteDepartmentList(id))
                toast.error("Xóa thành công")
            }
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}


export function createDepartment(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const dataRes = await instance.post(`/department`, data);
            if(dataRes){
                toast.success("Tạo thành công") 
                dispatch(createDepartmentReducer(dataRes.data.message))
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
            const dataRes = await instance.post(`/department/search`, {name:data});
            dispatch(searchData(dataRes.data))
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}



export function editDataDepartmentApi(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const {id , name} = data
            const dataRes = await instance.patch(`/department/${id}`, {name});
            dispatch(editData(data))
            toast.success(dataRes.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export const postsSelector = state => state.posts
export default listDepartment.reducer