import React, { useState } from 'react';
import { Box, Button, TextField, Grid, Paper, Typography } from '@mui/material';
//import { fetchMyWorkLogsData } from '../../data/mockData'; // Adjust the path based on your project structure

// Fetch function to get work logs within a specified date range
export const fetchMyWorkLogsData = async (startDate, endDate) => {
  const token = localStorage.getItem('accessToken');  // Retrieve token from localStorage

  if (!token) {
    throw new Error('No access token found. Please log in first.');
  }

  try {
    const response = await fetch(`https://udpt-be.onrender.com/api/v1/work-logs/me/?start_date=${startDate}&end_date=${endDate}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  // Attach token to header
        'Content-Type': 'application/json'
      }
    });

    console.log('Response object:', response);

    if (!response.ok) {
      const errorResponse = await response.text(); // Get error response as text
      console.error('Error response:', errorResponse);
      throw new Error('Failed to fetch work logs');
    }

    const data = await response.json();
    console.log('Work logs response data:', data);  // Log data for debugging
    return data;
  } catch (error) {
    console.error('Error fetching work logs:', error);
    return null;
  }
};

// React component to display work logs
const MyCheckInDashboard = () => {
  const [workLogs, setWorkLogs] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = async () => {
    if (startDate && endDate) {
      const formattedStartDate = `${startDate}T00:00:00`;
      const formattedEndDate = `${endDate}T23:59:59`;

      console.log('Formatted Dates:', formattedStartDate, formattedEndDate); // Log formatted dates

      const workLogsData = await fetchMyWorkLogsData(formattedStartDate, formattedEndDate);
      console.log('Fetched Work Logs Data:', workLogsData); // Log the returned data

      if (workLogsData && Array.isArray(workLogsData)) {
        setWorkLogs(workLogsData);
      } else {
        setWorkLogs([]);  // Reset work logs if no data
        console.warn('No data returned or data is not an array');
      }
    } else {
      console.warn('Start date or end date is missing');
    }
  };

  return (
    <Box m="20px">
      <Typography variant="h4" mb={2} color="#48D1CC">
        My Check Ins
      </Typography>

      {/* Date Search */}
      <Box display="flex" mb={2}>
        <TextField
          label="Start Date"
          variant="outlined"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          sx={{ mr: 2 }}
          type="date"
        />
        <TextField
          label="End Date"
          variant="outlined"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          sx={{ mr: 2 }}
          type="date"
        />
        <Button variant="contained" color="secondary" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      <Grid container spacing={3}>
        {workLogs.length > 0 ? (
          workLogs.map((log) => (
            <Grid item xs={12} md={6} lg={4} key={log.id}>
              <Paper elevation={3} sx={{ p: 3, bgcolor: "#f5f5f5" }}>
                <Typography variant="h6" mb={2} color="black">
                  Work Log ID: {log.id}
                </Typography>
                <Typography variant="body1" color="black"><strong>Check In:</strong> {new Date(log.check_in).toLocaleString()}</Typography>
                <Typography variant="body1" color="black"><strong>Check Out:</strong> {new Date(log.check_out).toLocaleString()}</Typography>
                <Typography variant="body1" color="black"><strong>Note:</strong> {log.note}</Typography>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="black">
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default MyCheckInDashboard;
