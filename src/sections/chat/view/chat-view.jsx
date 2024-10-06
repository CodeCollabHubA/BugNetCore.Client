import React, { useState, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { Box, CircularProgress, Container } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import styled from '@mui/material/styles/styled';

import chatConnection from 'src/utils/chatConnection';
import Iconify from 'src/components/iconify';
import { fTimeOnly } from 'src/utils/format-time';

export default function ChatView({ requestId, userId }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(null);

  const connectionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const shouldScroll = useRef(false);

  const navigate = useNavigate();

  const StyledForm = useMemo(
    () =>
      styled('form')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2.5),
      })),
    []
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (shouldScroll.current) {
      scrollToBottom();
      shouldScroll.current = false;
    }
  }, [messages]);

  useEffect(() => {
    console.log(requestId, userId);
    const fetchData = async () => {
      try {
        const connection = await chatConnection();
        const msgs = await connection.join(requestId, userId);
        setMessages(msgs);
        connection.onMessage((msg) => {
          setMessages((prevMessages) => [...prevMessages, msg]);
          if (
            messagesEndRef.current &&
            messagesEndRef.current.getBoundingClientRect().top < window.innerHeight
          ) {
            shouldScroll.current = true;
          } else {
            toast.success('New message received', {
              duration: 5000,
              icon: '📬',
            });
          }
        });
        connectionRef.current = connection;
        shouldScroll.current = true;
      } catch (error) {
        console.error(error);
        // navigate('/404');
      }
    };
    fetchData();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.leave();
      }
    };
  }, [requestId, userId, navigate]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    console.log(event.target.value);
  };
  const handleSendMessage = (event) => {
    event.preventDefault();
    if (message.trim() === '') return;
    connectionRef.current.send(message);
    const ms = { messageText: message, senderName: 'You', sentAt: new Date().toISOString() };
    setMessages((prevMessages) => [...prevMessages, ms]);
    console.log(ms.sentAt);
    shouldScroll.current = true;
    setMessage('');
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        component={Paper}
        sx={{
          width: '100%',
          height: '80vh',
        }}
      >
        <Grid
          item
          sm={3}
          sx={{
            borderRight: '1px solid #e0e0e0',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Typography variant="subtitle1" className="header-message" marginY={2} marginLeft={1}>
            Participants:
          </Typography>
          <Divider />
          <List ref={messagesEndRef}>
            <ListItem key="RemySharp">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="https://ahmedyassin.dev/images/me.png" />
              </ListItemAvatar>
              <ListItemText primary="John Wick - You" />
            </ListItem>
            <ListItem key="Alice">
              <ListItemAvatar>
                <Avatar alt="Alice" src="https://ahmedyassin.dev/images/me.png" />
              </ListItemAvatar>
              <ListItemText primary="Alice - Developer" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={9}>
          <List
            sx={{
              height: '70vh',
              overflowY: 'auto',
            }}
          >
            {messages !== null ? (
              messages.map((msg, index) => (
                <ListItem key={index}>
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText
                        // align={msg.sender === userId ? 'right' : 'left'}
                        align="right"
                        primary={msg.messageText}
                        secondary={msg.senderName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        //  align={msg.sender === userId ? 'right' : 'left'}
                        align="right"
                        secondary={fTimeOnly(new Date(msg.sentAt))}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              ))
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                }}
              >
                <CircularProgress />
              </Box>
            )}
            <div ref={messagesEndRef} />
          </List>
          <Divider />
          <StyledForm onSubmit={handleSendMessage}>
            <TextField
              label="Your Message ..."
              value={message}
              onChange={handleMessageChange}
              fullWidth
            />
            <Fab type="submit" color="primary" variant="extended" size="medium">
              <Iconify icon="fluent:send-16-filled" width={25} />
            </Fab>
          </StyledForm>
        </Grid>
      </Grid>
    </Container>
  );
}

ChatView.propTypes = {
  requestId: PropTypes.string,
  userId: PropTypes.string,
};
