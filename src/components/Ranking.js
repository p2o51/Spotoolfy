import { MonitorHeart, Favorite, ThumbDownAlt } from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup, Typography, Box } from '@mui/material';
import { useState } from 'react';

const Ranking = () => {
    const [rating, setRating] = useState('god');

    const handleRating = (_event, newRating) => {
        setRating(newRating);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 4 }}>
            <Typography variant="h6">Rate in {new Date().toLocaleDateString()}</Typography>
            <ToggleButtonGroup
                value={rating}
                exclusive
                onChange={handleRating}
                aria-label="song rating"
            >
                <ToggleButton value="god" aria-label="love song">
                    <Favorite />
                </ToggleButton>
                <ToggleButton value="mew" aria-label="like song">
                    <MonitorHeart />
                </ToggleButton>
                <ToggleButton value="shit" aria-label="dislike song">
                    <ThumbDownAlt />
                </ToggleButton>
            </ToggleButtonGroup>
            <Typography variant="body1">{rating}</Typography>
        </Box>
    );
};

export default Ranking;