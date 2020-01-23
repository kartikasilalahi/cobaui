import {combineReducers} from 'redux'
import Authreducer from './AuthReducers'

export default combineReducers({
    auth:Authreducer
})