const getAccessToken = () => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    return params.get('access_token');
};

export const getCurrentlyPlaying = async () => {
    const token = getAccessToken();
    if (!token) return null;

    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status === 204) {
        return null;
    }

    return await response.json();
};

export const spotifyService = {
    getAccessToken,
    getCurrentlyPlaying
};
