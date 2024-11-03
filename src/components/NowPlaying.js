import React, { useState } from 'react';
import { useSpotify } from '../services/SpotifyContext';
import { Box, Card, CardContent, CardMedia, Typography, CircularProgress, Button } from '@mui/material';

const NowPlaying = () => {
    
    const [isPlaying, setIsPlaying] = useState(true);

    const { currentTrack, error } = useSpotify();

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    }
    if (error) return <Typography color="error">Error: {error}</Typography>;
    if (!currentTrack) return <CircularProgress />;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 4 }}>
            <Card sx={{ maxWidth: 600, textAlign: 'center', boxShadow: 3, borderRadius: 2 }}>
                {currentTrack.item && (
                    <>
                        <CardMedia
                            component="img"
                            image={currentTrack.item.album.images[0].url}
                            alt={currentTrack.item.album.name}
                            sx={{ height: 300 }}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                {currentTrack.item.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {currentTrack.item.artists.map(artist => artist.name).join(', ')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                from {currentTrack.item.album.name}
                            </Typography>
                        </CardContent>
                    </>
                )}
            </Card>
            <Button variant="contained" sx={{mt:2}} onClick={togglePlayPause}>
                {isPlaying ? 'Play' : 'Pause'}
            </Button>
        </Box>
    );
};

export default NowPlaying;
