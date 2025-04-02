import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import Markdown from 'react-markdown';
import remarkGFM from "remark-gfm";

const Interface: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async() => {
    const startTime = performance.now();
    if (!input.trim()) return;
    const inputSave = input;

    setLoading(true);

    // Simulate an AI response after a brief delay
    try {
      const res = await fetch('/api/v1/ai/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input , history: messages }),
      });

      // Add user message
      const newMessage = { sender: 'User', text: input };
      setMessages((prev) => [...prev, newMessage]);

      if (!res.ok) {
        throw new Error('An error occurred');
      }

      const data = await res.json();

      const aiMessage = { sender: 'AI', text: data.aiMessage };

      setMessages((prev) => [...prev, aiMessage]);

      setLoading(false);

    } catch (error: any) {
      setLoading(false);
      console.error(error);
      const errorMessage = { sender: 'AI', text: 'An error occurred. Please try again.' };
      setMessages((prev) => [...prev, errorMessage]);

    }
    setInput('');
    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    const roundedTime = Math.round(timeTaken * 100) / 100 / 1000; // Round to 2 decimal places and translated to seconds
    console.log(`Message: ${inputSave}, Time taken: ${roundedTime} seconds`);

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
          maxWidth: "calc(0.8*100vw)",
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
        <Box sx={{ flex: 1, overflowY: 'auto', mb: 2, color: 'white' }}>
          <List>
            {messages.map((msg, index) => (
              <ListItem key={index}>
                <ListItemText primary={msg.sender} secondary={
                  <Markdown 
                    components={{
                      p: ({ node, ...props }) => <div {...props} />
                    }}
                    remarkPlugins={[remarkGFM]}>
                      {msg.text}
                  </Markdown>}
                  slotProps={{secondary: {component: 'div', sx: {color:"white", whiteSpace: 'pre-wrap'}}}}/>
              </ListItem>
            ))}
            <div ref={endOfMessagesRef} />
          </List>
        </Box>
        <Box sx={{ display: 'flex', color: 'white' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            autoComplete="off"
            value={input}
            slotProps={{input: {sx: {color:"white"}}}}
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
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <CircularProgress sx={{ color: 'white', paddingLeft: "20px", paddingRight: "20px"}} />
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
export default Interface