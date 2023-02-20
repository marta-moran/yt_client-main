
function VideoList({ videos }) {
    return (
        <div>
            {
                videos.map(video => <iframe controls src={video} key={video} height="270" width="480" title={video}></iframe>)
            }
        </div>
    )
}

export default VideoList