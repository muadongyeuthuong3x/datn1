import { createSlice } from '@reduxjs/toolkit'
import instance from '../configApi/axiosConfig'
import Cookies from 'js-cookie'
export const initialState = {
    loading: false,
}

const loginWeb = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginLoadding: state => {
            state.loading = true
        },
        loginSuccess: state => {
            state.loading = false
        },
        loginFailure: state => {
            state.loading = false
        },
    },
})

export const { loginLoadding, loginSuccess, loginFailure } = loginWeb.actions

export function apiLoginWeb(dataLogin, alert) {
    return async dispatch => {
        dispatch(loginLoadding())
        try {
            const response = await instance.post('/users/login', dataLogin)
            const { email, role, token } = response.data.user
            Cookies.set('tokenwebkma', token)
            localStorage.setItem("datawebkma", JSON.stringify({ email, role }))
            dispatch(loginSuccess)
            if(role == 'admin'){
                window.location.href = `/dashboard`
            }else if(role== 'user'){
                window.location.href = `/department`
            }else {
                window.location.href = `/edit-score`
            }
        
        } catch (error) {
            alert.error(error.response.data.message)
            dispatch(loginFailure())
        }
    }
}



export const postsSelector = state => state.posts
export default loginWeb.reducer