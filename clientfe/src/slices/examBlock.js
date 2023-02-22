import { createSlice } from '@reduxjs/toolkit'
import instance from '../configApi/axiosConfig'
import { toast } from 'react-toastify'
export const initialState = {
    loading: false,
    data: [],
    bigClass  : [],
    exams : [],
    listDataExamBigClass : []
}



const listExamBlockForm = createSlice({
    name: 'getListExamBlock',
    initialState,
    reducers: {
        loadding: state => {
            state.loading = true
        },
        getListExamBlockSuccess: (state, { payload }) => {
            state.loading = false
            const {  bigClass , exam ,listDataExamBigClass} = payload;
            state.bigClass = bigClass;
            state.exams = exam
            state.listDataExamBigClass =listDataExamBigClass
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
        createExamBlockReducer: (state, { payload }) => {
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

export const { loadding, getListExamBlockSuccess, deleteExamBlockList, loaddingFailes, createExamBlockReducer, searchData ,editData } = listExamBlockForm.actions

export function apiGetListExamBlock(alert) {
    return async dispatch => {
        dispatch(loadding())
            try {
                await Promise.all([
                    await instance.get('/big-block-class'),
                    await instance.get('/exam'),
                    await instance.get('/table-exam-big-block-class'),
                ]).then((res) => {
                    const bigClass = res[0]?.data
                    const exam = res[1]?.data
                    const listDataExamBigClass =  res[2]?.data
                    const objectList = {
                        bigClass , exam , listDataExamBigClass
                    }
                    dispatch(getListExamBlockSuccess(objectList))
                })
                    .catch(error => console.log(error));
          
        } catch (error) {
            alert.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export function deleteItemExamBlock(id) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const response = await instance.delete(`/exam-form/${id}`);
            if (response) {
                dispatch(deleteExamBlockList(id))
            }
            toast.success("Xóa thành công")
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}


export function createExamBlock(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const dataRes = await instance.post(`/table-exam-big-block-class`, data);
            toast.success("Tạo thành công")
            dispatch(createExamBlockReducer(dataRes.data.message))
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
            const dataRes = await instance.post(`/exam-form/search`, { name: data });
            dispatch(searchData(dataRes.data))
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}



export function editDataExamBlockApi(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const {id , name} = data
            const dataRes = await instance.patch(`/exam-form/${id}`, {name});
            dispatch(editData(data))
            toast.success(dataRes.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export const postsSelector = state => state.posts
export default listExamBlockForm.reducer