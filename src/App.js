import React, { useState, useEffect } from 'react';
import SpotifyAuth from './components/SpotifyAuth';
import NowPlaying from './components/NowPlaying';
import Ranking from './components/Ranking';
import { Box, Stack, ThemeProvider, Container, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import ThoughtsInput from './components/Thoughts';
import theme from './theme';
import ThoughtsList from './components/ThoughtsList';
import { FirebaseProvider } from './services/FirebaseContext';
import { SpotifyProvider } from './services/SpotifyContext';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(45deg, #1e1e1e, #2d2d2d);
`;

const Header = styled.header`
  padding: 2rem 1rem;
  text-align: center;
  color: white;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #1DB954, #1ed760);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const App = () => {
    const [token, setToken] = useState(null);
    const [thoughts, setThoughts] = useState([]);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const token = new URLSearchParams(hash.substring(1)).get('access_token');
            setToken(token);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <FirebaseProvider>
                <SpotifyProvider>
                    <Box sx={{
                        minHeight: '100vh',
                        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
                    }}>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    Spotoolfy
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        
                        <Container maxWidth="md" sx={{ mt: 4 }}>
                            {!token ? (
                                <SpotifyAuth />
                            ) : (
                                <Stack spacing={3}>
                                    <Box sx={{ display: 'flex', gap: 4 }}>
                                        <Box sx={{ flex: 1 }}>
                                            <NowPlaying />
                                        </Box>
                                    </Box>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        gap: 3,
                                        width: '100%',
                                        alignItems: 'flex-start'
                                    }}>
                                        <Box sx={{ 
                                            flex: 1,
                                            mt: 3
                                        }}>
                                            <ThoughtsInput onSubmit={(thought) => {
                                                setThoughts(prev => [...prev, {
                                                    id: Date.now(),
                                                    content: thought,
                                                    timestamp: new Date()
                                                }]);
                                            }} />
                                        </Box>
                                        <Box sx={{ flex: 1 }}>
                                            <ThoughtsList thoughts={thoughts} />
                                        </Box>
                                    </Box>
                                </Stack>
                            )}
                        </Container>
                    </Box>
                </SpotifyProvider>
            </FirebaseProvider>
        </ThemeProvider>
    );
};

export default App;