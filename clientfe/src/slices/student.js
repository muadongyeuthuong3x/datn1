import { createSlice, current } from '@reduxjs/toolkit'
import instance from '../configApi/axiosConfig'
import { toast } from 'react-toastify'
import { UploadMuitiFie } from "../uploadImage/index"
export const initialState = {
    loading: false,

}



const listSchedule = createSlice({
    name: 'getListSchedule',
    initialState,
    reducers: {
        loadding: state => {
            state.loading = true
        },
        postFilesScoreStudentBeetwen: (state, { payload }) => {
            state.loading = false
        },
        loaddingFailes: state => {
            state.loading = false
        },

    },
})

export const { loadding, postFilesScoreStudentBeetwen, loaddingFailes } = listSchedule.actions

export function postDataFileScoreStudent(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const dataRes = await instance.post("/students/import-csv/beet-ween", data, {
                headers: {
                    "content-type": "multipart/form-data",
                }
            });
            if (dataRes) {
                toast.success("Upload file điểm thành công");
                dispatch(postFilesScoreStudentBeetwen());
            }
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}

export function postDataFileScoreStudentEnd(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const dataRes = await instance.post("/students/import-csv/end", data, {
                headers: {
                    "content-type": "multipart/form-data",
                }
            });
            if (dataRes) {
                toast.success("Upload file điểm cuối kì thành công");
                dispatch(postFilesScoreStudentBeetwen());
            }
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}


export function postDataFileScoreStudentEndEnd(data) {
    return async dispatch => {
        dispatch(loadding())
        try {
            const dataRes = await instance.post("/students/import-csv/end_end", data, {
                headers: {
                    "content-type": "multipart/form-data",
                }
            });
            if (dataRes) {
                toast.success("Upload file điểm thi lại thành công");
                dispatch(postFilesScoreStudentBeetwen());
            }
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(loaddingFailes())
        }
    }
}



export const postsSelector = state => state.posts
export default listSchedule.reducer