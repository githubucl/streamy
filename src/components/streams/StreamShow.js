import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { fetchStream } from '../../actions'
import flv from 'flv.js'
const StreamShow = (props) => {
    const { id } = props.match.params
    const videoRef = useRef()
    const player = useRef()
    useEffect(() => {

        props.fetchStream(id)
        buildPlayer()

    }, [])
    useEffect(() => {
        buildPlayer();
        return () => {
            player.current.destroy()
        }

    }, [props.stream])

    const buildPlayer = () => {
        if (!props.stream) {
            return
        }
        else {
            player.current = flv.createPlayer({
                type: "flv",
                url: `http://localhost:8000/live/${id}.flv`,
            });

            player.current.attachMediaElement(videoRef.current);
            player.current.load();
        }

    };



    if (!props.stream) {
        return <div>Loading...</div>
    }
    else {
        const { title, description } = props.stream
        return (
            <div>
                <video ref={videoRef} style={{ width: '100%' }} controls={true} />
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow)