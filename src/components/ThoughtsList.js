import React, { useState, useEffect } from 'react';
import { 
  List, ListItem, ListItemText, Paper, Typography, Divider, 
  Box, Chip, Avatar, Rating
} from "@mui/material";
import { useFirebase } from '../services/FirebaseContext';
import { useSpotify } from '../services/SpotifyContext';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const ThoughtsList = () => {
    const [thoughts, setThoughts] = useState([]);
    const [homoThoughts, setHomoThoughts] = useState([]);
    const { user, db } = useFirebase();
    const { currentTrack } = useSpotify();

    useEffect(() => {
        const thoughtsRef = collection(db, `users/${user.uid}/thoughts`);

        const fetchThoughts = async () => {
            if (!user || !currentTrack) return;

            try {
                const q = query(
                    thoughtsRef,
                    where('trackId', '==', currentTrack.item.id),
                    orderBy('createdAt', 'desc')
                );

                // 执行查询
                const querySnapshot = await getDocs(q);
                const thoughtsList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    // 将 Timestamp 转换为可读时间
                    createdAt: doc.data().createdAt?.toDate().toLocaleString()
                }));

                setThoughts(thoughtsList);
            } catch (error) {
                console.error("Error fetching thoughts:", error);
            }
        };

        const fetchHomoThoughts = async () => {
            if (!user || !currentTrack) return;

            try {
                const q = query(
                    thoughtsRef,
                    where('trackName', '==', currentTrack.item.name),
                    where('trackId', '!=', currentTrack.item.id),
                    orderBy('createdAt', 'desc')
                );
                const querySnapshot = await getDocs(q);
                const homoThoughtsList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate().toLocaleString()
                }));

                setHomoThoughts(homoThoughtsList);

            } catch (error) {
                console.error("Error fetching homo thoughts:", error);
            }
        };
        fetchThoughts();
        fetchHomoThoughts();
    }, [user, currentTrack, db]); // 当用户或当前歌曲改变时重新获取数据

    const ThoughtItem = ({ thought, isHomo }) => (
        <ListItem 
            alignItems="flex-start"
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                my: 1,
                mx: 2,
                borderRadius: 2,
                transition: 'background-color 0.2s',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }
            }}
        >
            <Box sx={{ width: '100%', p: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography 
                        variant="caption" 
                        sx={{ 
                            color: '#fff',
                            fontSize: '0.75rem'
                        }}
                    >
                        {new Date(thought.createdAt).toLocaleString()}
                    </Typography>
                    <Typography 
                        variant="caption" 
                        sx={{ color: '#fff', fontSize: '0.75rem' }}
                    >
                        {thought.rating}
                    </Typography>
                </Box>
                <Typography 
                    variant="body1" 
                    sx={{ 
                        mb: 1,
                        lineHeight: 1.6,
                        color: '#fff'
                    }}
                >
                    {thought.content}
                </Typography>
                {isHomo && (
                    <Chip
                        icon={<MusicNoteIcon sx={{ fontSize: '0.9rem', color: 'white' }} />}
                        label={`${thought.artistName} - ${thought.trackName}`}
                        variant="outlined"
                        size="small"
                        sx={{ 
                            mt: 1,
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderColor: '#fff',
                            color: '#fff',
                            '& .MuiChip-label': {
                                fontSize: '0.75rem',
                                color: '#fff'
                            }
                        }}
                    />
                )}
            </Box>
        </ListItem>
    );

    return (
        <Box 
            sx={{ 
                width: '100%', 
                maxWidth: 600, 
                mt: 3, 
                mb: 3,
            }}
        >
            <Paper 
                elevation={0}
                sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: 2,
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                }}
            >
                <Box sx={{ 
                    p: 2, 
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)'
                }}>
                    <Typography 
                        variant="h6" 
                        align="center"
                        sx={{ 
                            fontWeight: 500,
                            color: 'primary.main'
                        }}
                    >
                        Thoughts on "{currentTrack?.item?.name}"
                    </Typography>
                </Box>
                
                <List sx={{ py: 1 }}>
                    {thoughts.map((thought) => (
                        <ThoughtItem key={thought.id} thought={thought} isHomo={false} />
                    ))}
                    {thoughts.length === 0 && (
                        <ListItem>
                            <ListItemText 
                                secondary="No thoughts on this song yet. Be the first to share!" 
                                sx={{
                                    textAlign: 'center',
                                    color: 'text.secondary',
                                    py: 2
                                }}
                            />
                        </ListItem>
                    )}
                </List>

                {homoThoughts.length > 0 && (
                    <>
                        <Box sx={{ 
                            p: 2, 
                            borderTop: '1px solid',
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            backgroundColor: 'rgba(255, 255, 255, 0.02)'
                        }}>
                            <Typography 
                                variant="h6" 
                                align="center"
                                sx={{ 
                                    fontWeight: 500,
                                    color: 'secondary.main'
                                }}
                            >
                                Related Thoughts
                            </Typography>
                        </Box>
                        <List sx={{ py: 1 }}>
                            {homoThoughts.map((thought) => (
                                <ThoughtItem key={thought.id} thought={thought} isHomo={true} />
                            ))}
                        </List>
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default ThoughtsList;