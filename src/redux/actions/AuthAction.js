import axios from 'axios';
import { 
    USER_LOGIN_SUCCESS, 
    AUTH_SYSTEM_ERROR, 
    AUTH_LOADING,
    USER_LOGOUT
} from './type';
import {APIURL} from '../../helper/apiUrl'


export const onUserRegister = ({ nama, email, password }) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOADING })
        if(nama === '' || email === '' || password === '') {
            dispatch({ type: AUTH_SYSTEM_ERROR, payload:{ error:  'Semua form diatas wajib diisi!' } })
        }
        else {
            console.log('redux nama',nama)
            console.log('redux email',email)
            console.log('redux pass',password)
            axios.post(APIURL+'auth/registerserver', {
                nama, email, password
            }).then((res) => {
                console.log('masuk sini ga?',res)
                if(res.data.status === 'error') {
                    dispatch({ type: AUTH_SYSTEM_ERROR, payload: res.data.message })
                }
                else {
                    console.log('lewat')
                    localStorage.setItem('nama',nama)
                    dispatch({ type : USER_LOGIN_SUCCESS, payload: res.data })
                }
            }).catch((err) => {
                console.log('sini err',err);
                dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System Error' })
            })        
        }
    }
}