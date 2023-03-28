


import { createSlice } from '@reduxjs/toolkit'
import instance from '../configApi/axiosConfig'
import { toast } from 'react-toastify'
export const initialState = {
    loading: false,
    data: []
}



const listRoom = createSlice({
    name: 'getListRoom',
    initialState,
    reducers: {
        loadding: state => {
            state.loading = true
        },
        getListRoomSuccess: (state, { payload }) => {
            state.data = payload
            state.loading = false
        },
        deleteRoomInList: (state, { payload }) => {
            state.loading = false
            const dataOld = [...state.data];
            const dataAfterDelete = dataOld.filter(item => item.id !== payload);
            state.data = dataAfterDelete
        },
        loaddingFailes: state => {
            state.loading = false
        },
        createRoomReducer: (state, { payload }) => {
            state.loading = false
            const dataOld = [...state.data];
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
            const { name , form_room  , id} = payload;
            const indexEdit = dataOld.findIndex(item => item.id === id);
            dataOld[indexEdit].name = name;
            dataOld[indexEdit].form_room = form_room
            state.data = dataOld
        },
    },
})

export const { loadding, getListRoomSuccess, deleteRoomInList, loaddingFailes, createRoomReducer, searchData ,editData } = listRoom.actions

export function apiGetListRoom(alert) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const response = await instance.get('/room');
            dispatch(getListRoomSuccess(response.data))
          
        } catch (error) {
            alert.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export function deleteItemRoom(id) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const response = await instance.delete(`/room/${id}`);
            if (response) {
                dispatch(deleteRoomInList(id))
                toast.success("Xóa thành công")
            }
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}


export function createRoom(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const dataRes = await instance.post(`/room`, data);
            dispatch(createRoomReducer(dataRes.data.message))
            toast.success("Tạo thành công")
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
            const dataRes = await instance.post(`/room/search`, { name: data });
            dispatch(searchData(dataRes.data))
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}



export function editDataRoomApi(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const {id} = data
            const dataRes = await instance.patch(`/room/${id}`, data);
            dispatch(editData(data))
            toast.success(dataRes.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export const postsSelector = state => state.posts
export default listRoom.reducer