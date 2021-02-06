import React from 'react'

import { createStream } from '../../actions'
import { connect } from 'react-redux'
import StreamForm from './streamForm'

const StreamCreate = (props) => {
    const onSubmit = (formValues) => {

        props.createStream(formValues)
    }

    return (
        <div>
            <h3>Create a Stream</h3>
            <StreamForm onSubmit={onSubmit} />

        </div>

    )
}


export default connect(null, { createStream })(StreamCreate)