import React, { useEffect } from 'react'
import Modal from '../Modal'
import history from '../../history'
import { fetchStream, deleteStream } from '../../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const StreamDelete = (props) => {

    useEffect(() => {
        props.fetchStream(props.match.params.id)
    }, [])
    const renderAction = () => {
        if (!props.stream) {
            return 'Are you sure you wanna delete this stream'
        }
        else {
            return `are you sure you wanna delete the stream with title: ${props.stream.title}`
        }
    }

    const { id } = props.match.params

    const actions = (
        <>
            <button
                onClick={() => props.deleteStream(id)}
                className="ui button negative">Delete
            </button>
            <Link to='/' className="ui button">Cancel </Link>
        </>
    )

    return (
        <div>

            <Modal
                title="Delete Stream"
                content={renderAction()}
                actions={actions}
                onDismiss={() => history.push('/')}

            />
        </div>
    )
}






const mapStateToProps = (state, ownProps) => {


    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete)