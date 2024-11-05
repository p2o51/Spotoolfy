export const config = {
    clientId: '64103961829a42328a6634fb80574191', // 请替换为您的 Spotify Client ID
    redirectUri: 'http://localhost:3000',
    authEndpoint: 'https://accounts.spotify.com/authorize',
    scopes: [
        'user-read-currently-playing',
        'user-read-playback-state',
        'user-modify-playback-state',
    ]
};
