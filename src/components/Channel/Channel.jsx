import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import youtubeService from "../../services/youtube.service"
import VideoList from "../VideoList/VideoList"
import HeaderChannel from "./HeaderChannel"


function Channel() {
    const { id } = useParams()
    const [videos, setVideos] = useState([])
    // const [channel, setChannel] = useState([])
    const [channel, setChannel] = useState({
        id: '',
        snippet: ''
    });

    const getVideos = async () => {
        try {
            //primero busco los vídeos del canal
            const channelVideos = await youtubeService.getChannelVideos(id)
            //almaceno los ids de los vídeos
            const videosIds = getVideosIds(channelVideos)
            //hago una promesa por cada vídeo
            const promises = videosIds.map(id => youtubeService.getVideoInfo(id))
            //espero a que se revuelvan todas las promesas para poder obtener el iframe
            //const allVideos = await Promise.all(promises.slice(0, 7)) //lo parto para que no se me agoten las llamadas que son muy limitadas
            const allVideos = await Promise.all(promises)
            const embebedURLs = allVideos.map(video => video.items[0].player.embedHtml)

            /*
            la propiedad embedHtml aunque en origen sea un iframe viene como un string, por tanto, para poder obtener
            el src del iframe para después utilizarlo, parseo ese string a un elemento html del cual obtendré su src
            para poder servirme de él.
             */
            const videos = embebedURLs.map(embebedURL => {
                const parser = new DOMParser()
                const doc = parser.parseFromString(embebedURL, 'text/html')
                const iframeSrc = doc.querySelector('iframe').getAttribute('src')

                //retorno el src de cada iframe
                return iframeSrc
            })

            setVideos(videos)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        youtubeService.getOneChannel(id)
            .then(channelSelected => {
                setChannel({ id: channelSelected.items[0].id, snippet: channelSelected.items[0].snippet })
            })
            .catch(error => console.log(error))
        getVideos()
    }, [])


    console.log(channel)

    const getVideosIds = (channelVideos) => {
        //una vez que tengo el objeto, me quedo con todos los ids de los videos
        const allVideosIds = channelVideos.items.map(item => item.id.videoId)
        return allVideosIds
    }

    return (
        <div>
            {
                channel.id && (
                    <>
                        <HeaderChannel channel={channel}></HeaderChannel>
                        <Link to={`/dashboard/${channel.id}`}>ver metricaaass</Link>
                    </>
                )
            }
            <VideoList videos={videos}></VideoList>
        </div>
    )
}

export default Channel