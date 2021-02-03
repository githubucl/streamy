import { map } from 'lodash'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchStreams } from '../../actions'
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
        </div>
    )
}

const renderAdmin = (stream, props) => {
    console.log(props);
    if (stream.userId === props.currentUserId) {
        return (
            <div>
                edit or delete
            </div>
        )
    }
}

const renderList = (props) => {

    return props.streams.map(stream => {
        return (
            <div className="item" key={stream.id}>
                <i className="large middle aligned icon camera" />
                <div className="content">
                    {stream.title}
                    <div>
                        {stream.description}
                    </div>
                </div>
                {renderAdmin(stream, props)}
            </div>
        )
    })

}

const mapStateToProps = (state) => {

    return {
        streams: Object.values(state.streams),
        currentUserId: state.signInState.userId
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList)