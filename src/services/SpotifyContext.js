import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentlyPlaying } from './spotifyService';
const SpotifyContext = createContext(null);

export const SpotifyProvider = ({children}) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [error, setError] = useState(null);
    const [currentRating, setCurrentRating] = useState('god');

    const value = {
        currentTrack,
        setCurrentTrack,
        error,
        currentRating,
        setCurrentRating
    }

    useEffect(() => {
        let isMounted = true;

        const fetchCurrentTrack = async () => {
            try {
                const data = await getCurrentlyPlaying();
                if (isMounted) {
                    setCurrentTrack(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError('Failed to fetch current track');
                }
            }
        };

        const interval = setInterval(fetchCurrentTrack, 5000);
        fetchCurrentTrack();

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    return (
        <SpotifyContext.Provider value={value}>
            {children}
        </SpotifyContext.Provider>
    );
}

export const useSpotify = () => {
    const context = useContext(SpotifyContext);
    if (!context) {
        throw new Error('useSpotify must be used within a SpotifyProvider');
    }
    return context;
}