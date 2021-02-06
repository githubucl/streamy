
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchStreams } from '../../actions'
import { Link } from 'react-router-dom'
const StreamList = (props) => {
    useEffect(() => {
        props.fetchStreams()
    }, [])

    return (
        <div>
            <h2>Streams</h2>
            <div className="ui celled list">
                {renderList(props)}

            </div>
            {renderCreate(props)}
        </div>
    )
}

const renderAdmin = (stream, props) => {
    console.log(props);
    if (stream.userId === props.currentUserId) {
        return (
            <div className="right floated content">
                <Link to={`/stream/edit/${stream.id}`} className="ui button primary ">Edit</Link>
                <Link className="ui button negative " to={`/stream/delete/${stream.id}`}>
                    Delete
              </Link>
            </div>
        )
    }
}

const renderCreate = (props) => {
    if (props.isSignedIn) {
        return (
            <div style={{ textAlign: 'right' }}>
                <Link to='/stream/new' className="ui button primary">Create Stream</Link>
            </div>
        )
    }
}

const renderList = (props) => {

    return props.streams.map(stream => {
        return (
            <div className="item" key={stream.id}>
                {renderAdmin(stream, props)}
                <i className="large middle aligned icon camera" />
                <div className="content">
                    {stream.title}
                    <div>
                        {stream.description}
                    </div>
                </div>


            </div>
        )
    })

}

const mapStateToProps = (state) => {

    return {
        streams: Object.values(state.streams),
        currentUserId: state.signInState.userId,
        isSignedIn: state.signInState.isSignedIn
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList)