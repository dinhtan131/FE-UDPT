import React, { useState, useEffect } from 'react';
import { fetchPointSent, fetchPointReceived } from '../../data/mockData'; // Adjust the import path based on your project structure
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TablePagination } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PointsDashboard = () => {
  const [sentPoints, setSentPoints] = useState([]);
  const [receivedPoints, setReceivedPoints] = useState([]);
  const theme = useTheme();

  // Sent points state
  const [sentPage, setSentPage] = useState(0);
  const [sentPageSize, setSentPageSize] = useState(10);
  const [sentRowCount, setSentRowCount] = useState(0);

  // Received points state
  const [receivedPage, setReceivedPage] = useState(0);
  const [receivedPageSize, setReceivedPageSize] = useState(10);
  const [receivedRowCount, setReceivedRowCount] = useState(0);

  // Fetch data for sent points
  useEffect(() => {
    const loadSentPoints = async () => {
      const teamData = await fetchPointSent(sentPage + 1, sentPageSize); // Gọi API với phân trang
      setSentPoints(teamData.users); // Cập nhật danh sách người dùng
      setSentRowCount(teamData.total); // Cập nhật tổng số bản ghi
    };
    loadSentPoints();
  }, [sentPage, sentPageSize]);

  // Fetch data for received points
  useEffect(() => {
    const loadReceivedPoints = async () => {
      const data = await fetchPointReceived(receivedPage + 1, receivedPageSize);
      setReceivedPoints(data.users);
      setReceivedRowCount(data.total);
    };
    loadReceivedPoints();
  }, [receivedPage, receivedPageSize]);

  // Handle page change for Sent Points
  const handleSentPageChange = (event, newPage) => {
    setSentPage(newPage);
  };

  // Handle page size change for Sent Points
  const handleSentPageSizeChange = (event) => {
    setSentPageSize(parseInt(event.target.value, 10));
    setSentPage(0); // Reset page to 0 when page size changes
  };

  // Handle page change for Received Points
  const handleReceivedPageChange = (event, newPage) => {
    setReceivedPage(newPage);
  };

  // Handle page size change for Received Points
  const handleReceivedPageSizeChange = (event) => {
    setReceivedPageSize(parseInt(event.target.value, 10));
    setReceivedPage(0); // Reset page to 0 when page size changes
  };

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
        <TablePagination
          component="div"
          count={sentRowCount}
          page={sentPage}
          onPageChange={handleSentPageChange}
          rowsPerPage={sentPageSize}
          onRowsPerPageChange={handleSentPageSizeChange}
          rowsPerPageOptions={[5, 10, 25]}
        />
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
        <TablePagination
          component="div"
          count={receivedRowCount}
          page={receivedPage}
          onPageChange={handleReceivedPageChange}
          rowsPerPage={receivedPageSize}
          onRowsPerPageChange={handleReceivedPageSizeChange}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Box>
    </Box>
  );
};

export default PointsDashboard;
