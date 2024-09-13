import React, { useEffect, useState } from 'react';
import { fetchUserTickets } from '../../data/mockData'; // Adjust the import path based on your project structure
import { Box, Typography, CircularProgress, Grid, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const UserTicketsDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const getTickets = async () => {
      try {
        const data = await fetchUserTickets(); // Fetch tickets data using your API call
        if (data && data.data) {
          setTickets(data.data); // Assuming the ticket data is in data.data array
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getTickets();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor={theme.palette.background.default}
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor={theme.palette.background.default}
      >
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box m="20px">
      <Typography variant="h4" mb={2} color="#48D1CC">
        User Tickets
      </Typography>

      {tickets.length === 0 ? (
        <Typography variant="h6" color="white">No tickets available</Typography>
      ) : (
        <Grid container spacing={3}>
          {tickets.map((ticket) => (
            <Grid item xs={12} md={6} lg={4} key={ticket.id}>
              <Paper elevation={3} sx={{ p: 3, bgcolor: "#f5f5f5" }}>
                <Typography variant="h6" mb={2} color="black">
                  Ticket ID: {ticket.id}
                </Typography>
                <Typography variant="body1" color="black"><strong>Type:</strong> {ticket.type}</Typography>
                <Typography variant="body1" color="black"><strong>Description:</strong> {ticket.description}</Typography>
                <Typography variant="body1" color="black"><strong>Status:</strong> {ticket.status}</Typography>
                <Typography variant="body1" color="black"><strong>From Date:</strong> {new Date(ticket.from_date).toLocaleString()}</Typography>
                <Typography variant="body1" color="black"><strong>To Date:</strong> {new Date(ticket.to_date).toLocaleString()}</Typography>
                <Typography variant="body1" color="black"><strong>Created At:</strong> {new Date(ticket.created_at).toLocaleString()}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default UserTicketsDashboard;
