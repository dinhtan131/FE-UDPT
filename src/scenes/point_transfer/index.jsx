import React, { useState, useEffect } from 'react';
import { fetchPointSent, fetchPointReceived } from '../../data/mockData'; // Adjust the import path based on your project structure
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PointsDashboard = () => {
  const [sentPoints, setSentPoints] = useState([]);
  const [receivedPoints, setReceivedPoints] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const loadSentPoints = async () => {
      const data = await fetchPointSent();
      setSentPoints(data);
    };

    const loadReceivedPoints = async () => {
      const data = await fetchPointReceived();
      setReceivedPoints(data);
    };

    loadSentPoints();
    loadReceivedPoints();
  }, []);

  return (
    <Box sx={{ padding: theme.spacing(3) }}>
      <Typography variant="h4" gutterBottom>
        Points Dashboard
      </Typography>

      {/* Sent Points Table */}
      <Box mb={5}>
        <Typography variant="h6" mb={2}>
          Sent Points
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>From User ID</TableCell>
              <TableCell>To User ID</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sentPoints.map((point) => (
              <TableRow key={point.id}>
                <TableCell>{point.id}</TableCell>
                <TableCell>{point.from_user_id}</TableCell>
                <TableCell>{point.to_user_id}</TableCell>
                <TableCell>{point.points}</TableCell>
                <TableCell>{point.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Received Points Table */}
      <Box>
        <Typography variant="h6" mb={2}>
          Received Points
        </Typography>
        <Table>
        <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>From User ID</TableCell>
              <TableCell>To User ID</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receivedPoints.map((point) => (
              <TableRow key={point.id}>
                <TableCell>{point.id}</TableCell>
                <TableCell>{point.from_user_id}</TableCell>
                <TableCell>{point.to_user_id}</TableCell>
                <TableCell>{point.points}</TableCell>
                <TableCell>{point.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default PointsDashboard;
