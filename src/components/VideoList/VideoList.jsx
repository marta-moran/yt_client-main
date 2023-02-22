import './VideoList.css'
import { useState } from 'react';
import Fab from '@mui/material/Fab';
import moment from "moment";


function VideoList({ videos, info }) {
    console.log(videos)
    console.log("INFO DE LOS VIDEOS", info)

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
                        currentVideosPerPage.map((video, index) => {
                            console.log("LA TAAAG", info[5].tags[5])
                            return (
                                <>
                                    <iframe controls className="video" src={video} key={index} height="180" width="310" title={video}></iframe>
                                    <div className='video-details'>
                                        <p>{info[index].title}</p>
                                        <p>{moment(info[index].publishedAt).format("DD [de] MMMM [de] YYYY")}</p>

                                    </div>
                                    <div className='tag'>
                                        {
                                            info[index].tags ? info[index].tags.slice(0, 4).map(tag => <span >{tag}</span>) : null
                                        }
                                    </div>


                                </>

                            )

                        })
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