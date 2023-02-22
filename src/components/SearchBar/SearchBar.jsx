import './SearchBar.css'
import InputUnstyled from '@mui/base/InputUnstyled';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import { forwardRef, useEffect, useState } from 'react';
import youtubeService from '../../services/youtube.service';
// import ModalInfo from '../Modal/Modal';

import HeaderChannel from '../Channel/HeaderChannel';
import { Link } from 'react-router-dom';


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

    const handleSubmit = async (e) => {
        e.preventDefault();


        let localStorageExistente = localStorage.getItem("historial");
        let listaActualizada = localStorageExistente ? localStorageExistente + ", " + searchQuery : searchQuery
        localStorage.setItem('historial', listaActualizada)

        try {
            const channels = await youtubeService.getChannels(searchQuery);
            if (channels.items.length > 0) {
                const channelItem = channels.items[0];

                if (channelItem.id.kind === 'youtube#channel') {
                    const channelSelected = await youtubeService.getOneChannel(channelItem.id.channelId);
                    setChannel({ id: channelSelected.items[0].id, snippet: channelSelected.items[0].snippet })
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


    useEffect(() => {
        youtubeService.getChannelStats(channel.id)
            .then(stats => console.log(stats))

    }, [channel]);



    return (
        <>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }} className="search-form">
                <InputUnstyled onChange={handleInputChange} className='SearchInput' slots={{ input: StyledInputElement }} {...props} ref={ref} />
                <div>
                    <SubmitButton>Search</SubmitButton>
                </div>
            </Box>
            <div className='channel'>
                {
                    channel.id && (
                        <Link to={`/search/${channel.id}`}><HeaderChannel channel={channel}></HeaderChannel></Link>
                    )
                }
            </div>

        </>
    );
});

export default function UnstyledInputBasic() {
    return <CustomInput aria-label="Demo input" placeholder="Search a Channel…" />;
}