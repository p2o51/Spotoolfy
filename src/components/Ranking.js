import { MonitorHeart, Favorite, ThumbDownAlt } from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup, Typography, Box } from '@mui/material';
import { useSpotify } from '../services/SpotifyContext';

const Ranking = () => {
    const { currentTrack, currentRating, setCurrentRating } = useSpotify();

    const handleRating = (_event, newRating) => {
        if (newRating !== null) {
            setCurrentRating(newRating);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 4 }}>
            {currentTrack && (
                <>
                    <Typography variant="h6" sx={{ color: '#fff' }}>Rate "{currentTrack.item.name}"</Typography>
                    <ToggleButtonGroup
                        value={currentRating}
                        exclusive
                        onChange={handleRating}
                        aria-label="song rating"
                    >
                        <ToggleButton value="god" aria-label="love song">
                            <Favorite sx={{ color: '#fff' }}/>
                        </ToggleButton>
                        <ToggleButton value="mew" aria-label="like song">
                            <MonitorHeart sx={{ color: '#fff' }}/>
                        </ToggleButton>
                        <ToggleButton value="shit" aria-label="dislike song">
                            <ThumbDownAlt sx={{ color: '#fff' }}/>
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <Typography variant="body1" sx={{ color: '#fff' }}>{currentRating}</Typography>
                </>
            )}
        </Box>
    );
};

export default Ranking;