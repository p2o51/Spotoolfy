import { List, ListItem, ListItemText, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { useFirebase } from '../services/FirebaseContext';
import { useSpotify } from '../services/SpotifyContext';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

const ThoughtsList = () => {
    const [thoughts, setThoughts] = useState([]);
    const { user, db } = useFirebase();
    const { currentTrack } = useSpotify();

    useEffect(() => {
        const fetchThoughts = async () => {
            if (!user || !currentTrack) return;

            try {
                // 构建查询
                const thoughtsRef = collection(db, `users/${user.uid}/thoughts`);
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

        fetchThoughts();
    }, [user, currentTrack, db]); // 当用户或当前歌曲改变时重新获取数据

    return (
        <Paper 
            variant="outlined"
            elevation={0}
            sx={{ 
                width: '100%', 
                maxWidth: 360, 
                mt: 2, 
                overflow: 'auto', 
                border: '2px solid',
                borderColor: 'primary.main',
                borderRadius: 6,
            }}
        >
            <List>
                <ListItem alignItems="center">
                    <ListItemText align="center">
                        My Thoughts on "{currentTrack?.item?.name}"
                    </ListItemText>
                </ListItem>
                {thoughts.map((thought) => (
                    <ListItem key={thought.id}>
                        <ListItemText 
                            primary={thought.content}
                            secondary={`${thought.rating} - ${thought.createdAt}`}
                        />
                    </ListItem>
                ))}
                {thoughts.length === 0 && (
                    <ListItem>
                        <ListItemText 
                            secondary="还没有关于这首歌的想法呢~" 
                            align="center"
                        />
                    </ListItem>
                )}
            </List>
        </Paper>
    );
};

export default ThoughtsList;