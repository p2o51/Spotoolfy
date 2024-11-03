import { TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useFirebase } from '../services/FirebaseContext';
import { useSpotify } from '../services/SpotifyContext';

const ThoughtsInput = () => {
    const [thoughts, setThoughts] = useState('');
    const { user, db } = useFirebase();
    const [submittedThoughts, setSubmittedThoughts] = useState('');
    const { currentTrack, error } = useSpotify();
    const handleThoughtsChange = (event) => {
        setThoughts(event.target.value);
    };
    const handleSubmit = () => {
        setSubmittedThoughts(thoughts);
    };
    return(
        <Box>
            {currentTrack && (
                <Typography variant="h6">Your thoughts will be saved on {currentTrack.item.artists.map(artist => artist.name).join(', ')}'s music:  {currentTrack?.item?.name}</Typography>
            )}
            <TextField label="Thoughts are what now playing" multiline rows={4} fullWidth value={thoughts} onChange={handleThoughtsChange} />
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>Submit</Button>
            <Typography variant="body1" sx={{ mt: 2 }}>{thoughts}</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>{submittedThoughts}</Typography>
        </Box>
    )
}

export default ThoughtsInput;