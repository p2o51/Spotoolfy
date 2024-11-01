import React from 'react';
import { config } from '../config';
import { Button } from '@mui/material';
import { FaSpotify } from "react-icons/fa";

function SpotifyAuth() {
    const handleLogin = () => {
        const authUrl = `${config.authEndpoint}?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=${config.scopes.join('%20')}&response_type=token&show_dialog=true`;
        window.location.href = authUrl;
    };

    return (
        <Button variant="contained" sx={{mt:2, backgroundColor: '#1DB954', color: 'black','& svg': { mr: 1 }}} onClick={handleLogin} >
            <FaSpotify />  Connect with Spotify
        </Button>
    );
}

export default SpotifyAuth;
