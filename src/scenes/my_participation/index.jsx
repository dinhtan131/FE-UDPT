// UserParticipationsDashboard.js

import React, { useEffect, useState } from 'react';
import { fetchUserParticipations } from '../../data/mockData'; // Adjust the import path based on your project structure
import { Box, Typography, CircularProgress, Grid, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const UserParticipationsDashboard = () => {
  const [participations, setParticipations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const getParticipations = async () => {
      try {
        const data = await fetchUserParticipations(); // Fetch participations data using your API call
        if (data && data.data) {
          setParticipations(data.data); // Assuming the participation data is in data.data array
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getParticipations();
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
        User Participations
      </Typography>

      {participations.length === 0 ? (
        <Typography variant="h6" color="white">No participations available</Typography>
      ) : (
        <Grid container spacing={3}>
          {participations.map((participation) => (
            <Grid item xs={12} md={6} lg={4} key={participation.id}>
              <Paper elevation={3} sx={{ p: 3, bgcolor: "#f5f5f5" }}>
                <Typography variant="h6" mb={2} color="black">
                  Participation ID: {participation.id}
                </Typography>
                <Typography variant="body1" color="black"><strong>Activity ID:</strong> {participation.activity_id}</Typography>
                <Typography variant="body1" color="black"><strong>User ID:</strong> {participation.user_id}</Typography>
                <Typography variant="body1" color="black"><strong>Activity Points:</strong> {participation.activity_points}</Typography>
                <Typography variant="body1" color="black"><strong>Created At:</strong> {new Date(participation.created_at).toLocaleString()}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default UserParticipationsDashboard;
