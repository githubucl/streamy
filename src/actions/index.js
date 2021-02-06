import history from '../history'
import streams from '../api/streams'

export const signIn = (userId) => {
    return ({
        type: 'SIGN_IN',
        payload: userId
    })
}
export const signOut = () => {
    return ({
        type: 'SIGN_OUT',

    })
}

export const createStream = (formValues) => {
    return async (dispatch, getState) => {
        const userId = getState().signInState.userId
        const response = await streams.post('/stream', { ...formValues, userId })
        dispatch({
            type: 'CREATE_STREAM',
            payload: response.data
        })
        history.push('/')
    }
}

export const fetchStreams = () => {
    return async (dispatch) => {
        const response = await streams.get('/stream')
        dispatch({
            type: 'FETCH_STREAMS',
            payload: response.data
        })
    }
}

export const fetchStream = (id) => {
    return async (dispatch) => {
        const response = await streams.get(`/stream/${id}`)
        dispatch({
            type: 'FETCH_STREAM',
            payload: response.data
        })
    }
}

export const editStream = (id, formValues) => {
    return async (dispatch) => {
        const response = await streams.patch(`/stream/${id}`, formValues)
        dispatch({
            type: 'EDIT_STREAM',
            payload: response.data
        })
        history.push('/')

    }
}

export const deleteStream = (id) => {
    return async (dispatch) => {
        await streams.delete(`/stream/${id}`)
        dispatch({
            type: 'DELETE_STREAM',
            payload: id
        })
        history.push('/')
    }
}