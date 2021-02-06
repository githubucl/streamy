import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchStream, editStream } from '../../actions'
import StreamForm from './streamForm'
import _ from 'lodash'

const StreamEdit = (props) => {

    const onSubmit = (formValues) => {
        props.editStream(props.match.params.id, formValues)
    }

    useEffect(() => {
        props.fetchStream(props.match.params.id)
    }, [])
    if (!props.stream) {
        return (
            <div>
                Loading...
            </div>
        )
    } else {
        return (
            <div>
                <h3>Edit Form</h3>
                <StreamForm initialValues={_.pick(props.stream, 'title', 'description')} onSubmit={onSubmit} />
            </div>
        )
    }
}



const mapStateToProps = (state, ownProps) => {

    return {
        stream: state.streams[ownProps.match.params.id]
    }
}
export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit)