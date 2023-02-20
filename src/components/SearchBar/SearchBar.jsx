import './SearchBar.css'
import InputUnstyled from '@mui/base/InputUnstyled';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import { forwardRef, useEffect, useState } from 'react';
import youtubeService from '../../services/youtube.service';
import ModalInfo from '../Modal/Modal';
import { Link } from 'react-router-dom';
import VideoList from '../VideoList/VideoList';


const blue = {
    100: '#DAECFF',
    200: '#80BFFF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
};

const grey = {
    50: '#F3F6F9',
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A2027',
};

const StyledInputElement = styled('input')(
    ({ theme }) => `
  width: 320px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }
`,
);

const CustomInput = forwardRef(function CustomInput(props, ref) {

    const [searchQuery, setSearchQuery] = useState("")
    const [channel, setChannel] = useState({
        id: '',
        snippet: ''
    });

    const [videos, setVideos] = useState([])
    const [canShow, setCanShow] = useState(false)



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const channels = await youtubeService.getChannels(searchQuery);

            if (channels.items.length > 0) {
                const channelItem = channels.items[0];

                if (channelItem.id.kind === 'youtube#channel') {
                    const channelSelected = await youtubeService.getOneChannel(channelItem.id.channelId);
                    setChannel({ id: channelSelected.items[0].id, snippet: channelSelected.items[0].snippet })
                    const channelVideos = await youtubeService.getChannelVideos(channelSelected.items[0].id)
                    const videosIds = getVideosIds(channelVideos)
                    const promises = videosIds.map(id => youtubeService.getVideoInfo(id))
                    const allVideos = await Promise.all(promises.slice(0, 5))

                    const embebedURLs = allVideos.map(video => video.items[0].player.embedHtml)

                    const videos = embebedURLs.map(embebedURL => {
                        const parser = new DOMParser()
                        const doc = parser.parseFromString(embebedURL, 'text/html')
                        const iframeSrc = doc.querySelector('iframe').getAttribute('src')

                        return iframeSrc
                    })

                    setVideos(videos)

                } else {
                    console.log('El resultado no es un canal de YouTube.');
                }
            } else {
                console.log('No se encontraron canales de YouTube.');
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleInputChange = (e) => {
        const { value } = e.target
        setSearchQuery(value)
    }

    const getVideosIds = (channelVideos) => {
        const allVideosIds = channelVideos.items.map(item => item.id.videoId)
        return allVideosIds
    }


    useEffect(() => {
        console.log(channel);
    }, [channel]);



    return (
        <>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }} className="search-form">
                {/* <SearchIcon /> */}
                <InputUnstyled onChange={handleInputChange} className='SearchInput' slots={{ input: StyledInputElement }} {...props} ref={ref} />
                <div>
                    <SubmitButton>Search</SubmitButton>
                </div>
            </Box>
            <section className='channel-section'>
                {
                    !canShow ? (

                        channel.id !== "" && (
                            <>
                                <div className='details'>
                                    <div className='header-img-section'>
                                        {/* <img src="https://yt3.googleusercontent.com/ytc/AL5GRJXZiEpBJMMszFTf1eL-YH2PMBSEQ7Vem-hWMflpiw=s176-c-k-c0x00ffffff-no-rj" alt='imagen del canal' /> */}
                                        <img src={channel.snippet.thumbnails.default.url} alt={channel.snippet.title} />
                                    </div>
                                    <div className='header-channel-section'>
                                        <h2>{channel.snippet.title}</h2>
                                        <h3>{channel.snippet.customUrl}</h3>
                                        {/* 
                                    <h2>Un titulo</h2>
                                    <h3>@ShinChanES</h3> */}
                                        <button onClick={() => setCanShow(true)}>VER MÁS</button>
                                        {/* <ModalInfo description={channel.snippet.description}></ModalInfo> */}

                                    </div>
                                </div>
                                <div className='header-description-section'>
                                    <p>{channel.snippet.description}</p>
                                </div>
                            </>
                        )) : (
                        <VideoList videos={videos}></VideoList>
                    )
                }

                {/* <img src={channel.snippet.thumbnails.default.url} alt={channel.snippet.title} />
                <ul>
                    {Object.entries(channel).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {value}
                        </li>
                    ))}
                </ul> */}
            </section>
        </>
    );
});

export default function UnstyledInputBasic() {
    return <CustomInput aria-label="Demo input" placeholder="Search a Channel…" />;
}