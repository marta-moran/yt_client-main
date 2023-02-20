

function VideoList({ videos }) {


    return (
        <div>
            {
                videos.map(video => <iframe controls src={video} key={video} height="270" width="400" title={video}></iframe>)
            }
        </div>
    )
}

export default VideoList