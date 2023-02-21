import Pagination from '@mui/material/Pagination';
import { useState } from 'react';

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
            <div>
                {
                    pages.map((page) => {
                        return (
                            <button onClick={() => setCurrentPage(page)}>{page} </button>
                        )
                    })
                }
                {
                    currentVideosPerPage.map(video => <iframe controls src={video} key={video} height="270" width="400" title={video}></iframe>)
                }
            </div>

        </>

    )
}

export default VideoList