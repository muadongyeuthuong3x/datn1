import { createSlice } from '@reduxjs/toolkit'
import instance from '../configApi/axiosConfig'
import { toast } from 'react-toastify'
export const initialState = {
    loading: false,
    dataOldSearchView: [],
    bigClass  : [],
    exams : [],
    listDataExamBigClass : [],
    getYear : []
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
            state.dataOldSearchView = listDataExamBigClass
        },
        deleteExamList: (state, { payload }) => {
            state.loading = false
            const dataOld = [...state.listDataExamBigClass];
            const dataAfterDelete = dataOld.filter(item => item.id !== payload);
            state.listDataExamBigClass = dataAfterDelete
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
            state.listDataExamBigClass = payload
        },
        editData: (state) => {
            state.loading = false
        },
        getYearStore: (state ,{ payload }) => {
            state.loading = false;
            const dataOld = state.dataOldSearchView;
            const dataFilter = dataOld.filter(e=>e.id_exam.id === payload);
            state.getYear = dataFilter

        },
    },
})

export const { loadding, getListExamBlockSuccess, deleteExamList, loaddingFailes, createExamBlockReducer, searchData ,editData ,getYearStore } = listExamBlockForm.actions

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
            const response = await instance.delete(`/table-exam-big-block-class/${id}`);
            if (response) {
                dispatch(deleteExamList(id))
                toast.success("Xóa thành công")
            }
           
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
            if(dataRes){
                toast.success("Tạo thành công")
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
            const dataRes = await instance.post(`/table-exam-big-block-class/search`,  data );
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
            const {id } = data
            const dataRes = await instance.patch(`/table-exam-big-block-class/${id}`, data);
            if(dataRes){
                toast.success("Sửa dữ liệu thành công")
                dispatch(editData())
            }
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}


export function callDataGetYear(data){
    return async dispatch => {
        dispatch(loadding())
        try {   
                dispatch(getYearStore(data))
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}
export const postsSelector = state => state.posts
export default listExamBlockForm.reducer