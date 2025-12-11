'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Fade,
  Zoom,
  Chip,
  Button,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import MinimizeIcon from '@mui/icons-material/Minimize';
import SmartToyIcon from '@mui/icons-material/SmartToy';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
}

const QUICK_REPLIES = [
  'Track my order',
  'Payment help',
  'Product info',
  'Contact supplier',
];

export default function CustomerSupportBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI assistant. How can I help you today?",
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        text: message,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, userMessage]);
      setMessage('');

      // Simulate bot response
      setTimeout(() => {
        const botMessage: Message = {
          id: messages.length + 2,
          text: "Thanks for your message! I'm processing your request. A support agent will assist you shortly.",
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 1000);
    }
  };

  const handleQuickReply = (reply: string) => {
    setMessage(reply);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Zoom in={!isOpen}>
        <Box
          onClick={() => setIsOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1300,
            cursor: 'pointer',
            display: isOpen ? 'none' : 'flex',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: 70,
              height: 70,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF6A00 0%, #E65F00 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(255, 106, 0, 0.4)',
              transition: 'all 0.3s',
              border: '3px solid white',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: '0 12px 32px rgba(255, 106, 0, 0.5)',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 4,
                right: 4,
                width: 14,
                height: 14,
                borderRadius: '50%',
                bgcolor: '#4caf50',
                border: '2px solid white',
              },
            }}
          >
            <Avatar
              src="https://i.pravatar.cc/150?img=5"
              sx={{ width: 60, height: 60 }}
            />
          </Box>
          
          {/* Hover Text */}
          <Box
            sx={{
              position: 'absolute',
              right: '100%',
              top: '50%',
              transform: 'translateY(-50%)',
              mr: 2,
              bgcolor: 'white',
              px: 2,
              py: 1,
              borderRadius: 2,
              boxShadow: 2,
              whiteSpace: 'nowrap',
              opacity: 0,
              transition: 'opacity 0.3s',
              pointerEvents: 'none',
              '.MuiBox-root:hover &': {
                opacity: 1,
              },
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Customer Service
            </Typography>
          </Box>
        </Box>
      </Zoom>

      {/* Chat Window */}
      <Fade in={isOpen}>
        <Paper
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            width: { xs: 'calc(100vw - 32px)', sm: 380 },
            height: isMinimized ? 'auto' : { xs: 'calc(100vh - 100px)', sm: 600 },
            maxHeight: 'calc(100vh - 100px)',
            display: isOpen ? 'flex' : 'none',
            flexDirection: 'column',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            zIndex: 1300,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #FF6A00 0%, #E65F00 100%)',
              color: 'white',
              p: 2,
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  src="https://i.pravatar.cc/150?img=5"
                  sx={{ width: 40, height: 40 }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Customer Support
                  </Typography>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: '#4caf50',
                      }}
                    />
                    <Typography variant="caption">Online • 24/7</Typography>
                  </Stack>
                </Box>
              </Stack>
              <Stack direction="row" spacing={0.5}>
                <IconButton
                  size="small"
                  onClick={() => setIsMinimized(!isMinimized)}
                  sx={{ color: 'white' }}
                >
                  <MinimizeIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => setIsOpen(false)}
                  sx={{ color: 'white' }}
                >
                  <CloseIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Box>

          {!isMinimized && (
            <>
              {/* Messages */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                  p: 2,
                  bgcolor: '#f9fafb',
                }}
              >
                <Stack spacing={2}>
                  {messages.map((msg) => (
                    <Box
                      key={msg.id}
                      sx={{
                        display: 'flex',
                        justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      }}
                    >
                      {msg.sender === 'bot' && (
                        <Avatar
                          src="https://i.pravatar.cc/150?img=5"
                          sx={{ width: 32, height: 32, mr: 1 }}
                        />
                      )}
                      <Box sx={{ maxWidth: '75%' }}>
                        <Paper
                          sx={{
                            p: 1.5,
                            bgcolor: msg.sender === 'user' ? '#FF6A00' : 'white',
                            color: msg.sender === 'user' ? 'white' : 'text.primary',
                            borderRadius: 2,
                          }}
                        >
                          <Typography variant="body2">{msg.text}</Typography>
                        </Paper>
                        <Typography
                          variant="caption"
                          sx={{ display: 'block', mt: 0.5, ml: 1, color: 'text.secondary' }}
                        >
                          {msg.time}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                  <div ref={messagesEndRef} />
                </Stack>

                {/* Quick Replies */}
                {messages.length === 1 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                      💡 Quick replies:
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                      {QUICK_REPLIES.map((reply, idx) => (
                        <Chip
                          key={idx}
                          label={reply}
                          size="small"
                          onClick={() => handleQuickReply(reply)}
                          sx={{
                            bgcolor: 'white',
                            border: '1px solid #FF6A00',
                            color: '#FF6A00',
                            '&:hover': {
                              bgcolor: '#FF6A00',
                              color: 'white',
                            },
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                )}
              </Box>

              {/* Input */}
              <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid #e0e0e0' }}>
                <Stack direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                  <IconButton
                    onClick={handleSend}
                    disabled={!message.trim()}
                    sx={{
                      bgcolor: '#FF6A00',
                      color: 'white',
                      '&:hover': { bgcolor: '#E65F00' },
                      '&:disabled': { bgcolor: 'grey.300' },
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </Stack>
              </Box>
            </>
          )}
        </Paper>
      </Fade>
    </>
  );
}
