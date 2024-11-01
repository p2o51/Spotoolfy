import { TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";

const ThoughtsInput = () => {
    const [thoughts, setThoughts] = useState('');
    const [submittedThoughts, setSubmittedThoughts] = useState('');
    const handleThoughtsChange = (event) => {
        setThoughts(event.target.value);
    };
    const handleSubmit = () => {
        setSubmittedThoughts(thoughts);
    };
    return(
        <Box>
            <TextField label="Thoughts are what now playing" multiline rows={4} fullWidth value={thoughts} onChange={handleThoughtsChange} />
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>Submit</Button>
            <Typography variant="body1" sx={{ mt: 2 }}>{thoughts}</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>{submittedThoughts}</Typography>
        </Box>
    )
}

export default ThoughtsInput;