import { TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useFirebase } from '../services/FirebaseContext';
import { useSpotify } from '../services/SpotifyContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ThoughtsInput = () => {
    const [thoughts, setThoughts] = useState('');
    const { user, db } = useFirebase();
    const { currentTrack, currentRating } = useSpotify();
    const handleThoughtsChange = (event) => {
        setThoughts(event.target.value);
    };
    const handleSubmit = async () => {
        if (!user || !currentTrack || !thoughts) return;
        
        try {
            const thoughtsRef = collection(db, `users/${user.uid}/thoughts`);
            await addDoc(thoughtsRef, {
                content: thoughts,
                createdAt: serverTimestamp(),
                trackId: currentTrack.item.id,
                trackName: currentTrack.item.name,
                artistName: currentTrack.item.artists.map(artist => artist.name).join(', '),
                rating: currentRating,
                albumCover: currentTrack.item.album.images[0]?.url
            });
            
            setThoughts(''); // 清空输入
        } catch (error) {
            console.error("Error adding thought:", error);
        }
    };
    return (
        <Box sx={{ 
            padding: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 2,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        }}>
            {currentTrack && (
                <Typography 
                    variant="h6" 
                    sx={{ 
                        mb: 3,
                        fontWeight: 500,
                        color: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    <span>Currently writing about:</span>
                    <span style={{ color: 'text.primary' }}>
                        {currentTrack.item.name} - {currentTrack.item.artists.map(artist => artist.name).join(', ')}
                    </span>
                </Typography>
            )}
            
            <TextField 
                multiline 
                rows={4} 
                fullWidth 
                value={thoughts} 
                onChange={handleThoughtsChange}
                placeholder="Share your thoughts..."
                sx={{
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: 'background.paper',
                        borderRadius: 2,
                        '& fieldset': {
                            borderWidth: '1px',
                            transition: 'none',
                        },
                        '&:hover fieldset': {
                            borderWidth: '1px',
                        },
                        '&.Mui-focused fieldset': {
                            borderWidth: '1px !important',
                        }
                    }
                }}
            />
            
            <Box sx={{ 
                mt: 2, 
                display: 'flex', 
                justifyContent: 'flex-end' 
            }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSubmit}
                    sx={{
                        borderRadius: 28,
                        px: 4,
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 500,
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            transition: 'transform 0.2s'
                        }
                    }}
                >
                    Share Thought
                </Button>
            </Box>
            
            {thoughts && (
                <Typography 
                    variant="body1" 
                    sx={{ 
                        mt: 3,
                        p: 2, 
                        backgroundColor: 'background.paper',
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    {thoughts}
                </Typography>
            )}
        </Box>
    );
}

export default ThoughtsInput;