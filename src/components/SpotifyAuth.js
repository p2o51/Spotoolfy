import React from 'react';
import { config } from '../config';
import { Button, Box } from '@mui/material';
import { FaSpotify, FaGoogle } from "react-icons/fa";
import { useFirebase } from '../services/FirebaseContext';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function SpotifyAuth() {
    const {user} = useFirebase();
    const { auth } = useFirebase();
    
    const handleLoginSpotify = () => {
        const authUrl = `${config.authEndpoint}?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=${config.scopes.join('%20')}&response_type=token&show_dialog=true`;
        window.location.href = authUrl;
    };

    const handleLoginGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Google sign in error:", error);
        }
    };

    return (
        <Box>
            <Button variant="contained" sx={{mt:2, backgroundColor: '#1DB954', color: 'black','& svg': { mr: 1 }}} onClick={handleLoginSpotify} >
                <FaSpotify />  Connect with Spotify
            </Button>
            <Button variant="contained" sx={{mt:2, backgroundColor: '#DB4437', color: 'white','& svg': { mr: 1 }}} onClick={handleLoginGoogle} >
                <FaGoogle />  Connect with Google
            </Button>
            {user && <div>你已经登录为：{user.email}</div>}
        </Box>
    );
}

export default SpotifyAuth;