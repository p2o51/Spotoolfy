import { List, ListItem, ListItemText, Paper } from "@mui/material";
import { useState } from "react";

const ThoughtsList = () => {
    const [thoughts, setThoughts] = useState(['我感觉封神了','我好喜欢这首歌','这简直就是我😭','咋办我不行了']);

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
                    <ListItemText align="center">My Thoughts</ListItemText>
                </ListItem>
                {thoughts.map((thought, index) => (
                    <ListItem key={index}>
                        <ListItemText secondary={index + 1} primary={thought} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    )
}

export default ThoughtsList;