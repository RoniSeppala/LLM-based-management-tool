import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from '@mui/material';

const Interface: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async() => {
    if (!input.trim()) return;

    // Add user message
    const newMessage = { sender: 'User', text: input };
    setMessages((prev) => [...prev, newMessage]);

    // Simulate an AI response after a brief delay
    try {
      const res = await fetch('/api/v1/ai/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });

      if (!res.ok) {
        throw new Error('An error occurred');
      }

      const data = await res.json();

      console.log(data); // TODO: add extraction and display of message

    } catch (error: any) {
      console.error(error);
      const errorMessage = { sender: 'AI', text: 'An error occurred. Please try again.' };
      
    }
    setInput('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg,rgb(3, 8, 32) 5% , #764ba2)'
      }}
    >
      <Paper
        sx={{
          minWidth: 700,
          maxHeight: "calc(0.6*100vh)",
          display: 'flex',
          flexDirection: 'column',
          padding : '20px',
          background: 'rgba(70, 70, 70, 0.31)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.42)",
        }}
      >
        <Typography variant="h5" sx={{ textAlign: 'center', color: 'rgb(4, 156, 98)', fontWeight:'bold', textShadow: '2px 2px 8px rgba(133, 133, 133, 0.51)' }}>
            Chat Interface
        </Typography>
        <Box sx={{ flex: 1, overflowY: 'auto', mb: 2}}>
          <List>
            {messages.map((msg, index) => (
              <ListItem key={index}>
                <ListItemText primary={msg.sender} secondary={msg.text} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend();
                e.preventDefault();
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            sx={{ ml: 1, background: 'linear-gradient(28deg,rgb(26, 50, 168), #764ba2)', border: 1, borderColor: 'rgba(0, 0, 0, 0.3)'}}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
export default Interface