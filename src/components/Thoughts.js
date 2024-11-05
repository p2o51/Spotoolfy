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
    return(
        <Box>
            {currentTrack && (
                <Typography variant="h6">Your thoughts will be saved on {currentTrack.item.artists.map(artist => artist.name).join(', ')}'s music:  {currentTrack?.item?.name}</Typography>
            )}
            <TextField label="Thoughts are what now playing" multiline rows={4} fullWidth value={thoughts} onChange={handleThoughtsChange} />
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>Submit</Button>
            <Typography variant="body1" sx={{ mt: 2 }}>{thoughts}</Typography>
        </Box>
    )
}

export default ThoughtsInput;