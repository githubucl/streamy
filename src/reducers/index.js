import { combineReducers } from 'redux'
import signinreducer from './signinreducer'
import { reducer as formReducer } from 'redux-form'
import streamReducer from './streamReducer'
export default combineReducers({
    signInState: signinreducer,
    form: formReducer,
    streams: streamReducer
})