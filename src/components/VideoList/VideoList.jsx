import './VideoList.css'
import { useState } from 'react';
import Fab from '@mui/material/Fab';


function VideoList({ videos }) {
    console.log(videos)

    const [currentPage, setCurrentPage] = useState(1)
    const [videosPerPage, setVideosPerPage] = useState(3)
    const pages = []


    for (let i = 1; i < 6; i++) {
        pages.push(i)
    }

    const lastVideoIndex = currentPage * videosPerPage
    const firstVideoIndex = lastVideoIndex - videosPerPage
    const currentVideosPerPage = videos.slice(firstVideoIndex, lastVideoIndex)

    console.log(currentVideosPerPage)


    return (
        <>
            <div className='video-list'>
                <div className='iframes'>
                    {
                        currentVideosPerPage.map(video => <iframe controls className="video" src={video} key={video} height="180" width="310" title={video}></iframe>)
                    }
                </div>
                <div className='pagination'>
                    {
                        pages.map((page) => {
                            return (
                                <Fab className="button" color="primary" size="small" onClick={() => setCurrentPage(page)}>{page}</Fab>
                            )
                        })
                    }
                </div>
            </div>

        </>

    )
}

export default VideoList