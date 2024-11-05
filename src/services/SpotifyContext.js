import { createContext, useContext, useState, useEffect } from 'react';

const SpotifyContext = createContext(null);

export const SpotifyProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [error, setError] = useState(null);
  const [currentRating, setCurrentRating] = useState('god');
  const [isPlaying, setIsPlaying] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  // 确保在初始授权时包含了正确的 scope
  const scopes = [
    'user-read-playback-state',
    'user-modify-playback-state'
  ];

  // 获取访问令牌
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const token = params.get('access_token');
    setAccessToken(token);
  }, []);

  // 播放/暂停控制
  const togglePlayPause = async () => {
    if (!accessToken) return;

    try {
      // 首先获取当前播放器状态
      const playerResponse = await fetch('https://api.spotify.com/v1/me/player', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!playerResponse.ok) {
        setError('No active playback device found');
        return;
      }

      const playerData = await playerResponse.json();
      if (!playerData.device) {
        setError('No active playback device found');
        return;
      }

      // 根据当前状态决定使用哪个 endpoint
      const endpoint = isPlaying 
        ? 'https://api.spotify.com/v1/me/player/pause'
        : 'https://api.spotify.com/v1/me/player/play';

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: isPlaying ? null : JSON.stringify({
          device_id: playerData.device.id
        })
      });

      if (response.ok || response.status === 204) {
        setIsPlaying(!isPlaying);
      } else {
        const errorData = await response.json();
        setError(`Failed to toggle play/pause: ${errorData.error.message}`);
      }
    } catch (err) {
      setError('Failed to toggle play/pause: ' + err.message);
    }
  };

  // 获取当前播放曲目
  useEffect(() => {
    let isMounted = true;

    const fetchCurrentTrack = async () => {
      if (!accessToken) return;

      try {
        const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.status === 204) {
          if (isMounted) setCurrentTrack(null);
        } else if (response.ok) {
          const data = await response.json();
          if (isMounted) setCurrentTrack(data);
        } else {
          if (isMounted) setError('Failed to fetch current track');
        }
      } catch (err) {
        if (isMounted) setError('Failed to fetch current track');
      }
    };

    const interval = setInterval(fetchCurrentTrack, 5000);
    fetchCurrentTrack();

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [accessToken]);

  const value = {
    currentTrack,
    setCurrentTrack,
    error,
    currentRating,
    setCurrentRating,
    isPlaying,
    setIsPlaying,
    togglePlayPause,
  };

  return (
    <SpotifyContext.Provider value={value}>
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = () => {
  const context = useContext(SpotifyContext);
  if (!context) {
    throw new Error('useSpotify must be used within a SpotifyProvider');
  }
  return context;
};
