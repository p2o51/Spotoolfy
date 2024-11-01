import React, { useState, useEffect } from 'react';
import SpotifyAuth from './components/SpotifyAuth';
import NowPlaying from './components/NowPlaying';
import Ranking from './components/Ranking';
import { Box, Stack, ThemeProvider } from '@mui/material';
import ThoughtsInput from './components/Thoughts';
import theme from './theme';
import ThoughtsList from './components/ThoughtsList';

const App = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const token = new URLSearchParams(hash.substring(1)).get('access_token');
            setToken(token);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            {!token ? (
                <SpotifyAuth />
            ) : (
                <Stack spacing={2} alignItems="center">
                    <NowPlaying />
                    <Ranking style={{marginTop: '20px'}}/>
                    <ThoughtsInput />
                    <ThoughtsList />
                </Stack>
            )}
        </ThemeProvider>
    );
};

export default App;
