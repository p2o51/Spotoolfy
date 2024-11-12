import React from 'react';
import { useSpotify } from '../services/SpotifyContext';
import { Box, Card, CardContent, Typography, CircularProgress, Button } from '@mui/material';
import Ranking from './Ranking';
const NowPlaying = () => {
    const { isPlaying, togglePlayPause, currentTrack, error } = useSpotify();

    if (error) return <Typography color="error">Error: {error}</Typography>;
    if (!currentTrack) return <CircularProgress />;

    return (
        <Box sx={{
            display: 'flex',
            gap: 4,
            width: '100%',
            padding: 2,
        }}>
            {currentTrack.item && (
                <>
                    {/* Album Cover */}
                    <Box
                        component="img"
                        src={currentTrack.item.album.images[0].url}
                        alt={currentTrack.item.album.name}
                        sx={{
                            width: '300px',
                            height: '300px',
                            borderRadius: '20px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.02)'
                            }
                        }}
                    />

                    {/* Track Info and Controls */}
                    <Box sx={{ flex: 1 }}>
                        <Card sx={{
                            background: 'transparent',
                            borderRadius: 4,
                            overflow: 'hidden',
                            padding: 2,
                            marginBottom: 2,
                            boxShadow: 'none'
                        }}>
                            <CardContent>
                                <Typography 
                                    variant="h4" 
                                    component="div" 
                                    gutterBottom
                                    sx={{ 
                                        color: '#fff',
                                        fontWeight: 700,
                                        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                    }}
                                >
                                    {currentTrack.item.name}
                                </Typography>
                                <Typography 
                                    variant="h6" 
                                    sx={{ color: 'rgba(255,255,255,0.8)' }}
                                >
                                    {currentTrack.item.artists.map(artist => artist.name).join(', ')}
                                </Typography>
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{ color: 'rgba(255,255,255,0.6)' }}
                                >
                                    from {currentTrack.item.album.name}
                                </Typography>
                            </CardContent>
                        </Card>

                        <Box sx={{ pl: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Button 
                                variant="contained" 
                                onClick={togglePlayPause}
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: '50px',
                                    background: 'linear-gradient(45deg, #1DB954 30%, #1ed760 90%)',
                                    boxShadow: '0 3px 5px 2px rgba(29, 185, 84, .3)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 10px 4px rgba(29, 185, 84, .3)',
                                    }
                                }}
                            >
                                {isPlaying ? 'Pause' : 'Play'}
                            </Button>
                            <Ranking />
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default NowPlaying;
