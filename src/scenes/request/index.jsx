import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, useTheme, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { fetchTicketsData, updateTicket, fetchTicketById, fetchTicketsByUserId } from "../../data/mockData"; // Import the API functions

const ManageTickets = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [userId, setUserId] = useState(""); // State for user ID
  const [userData, setUserData] = useState([]); // State for storing fetched user data

  useEffect(() => {
    const getData = async () => {
      const ticketsData = await fetchTicketsData();
      setData(ticketsData);
    };

    getData();
  }, []);

  const handleStatusUpdate = async (ticket, status) => {
    const updatedTicket = { ...ticket, status };
    const updatedData = await updateTicket(ticket.id, updatedTicket);
    if (updatedData) {
      setData(data.map((t) => (t.id === ticket.id ? updatedData : t)));
    }
  };

  const handleViewClick = async (id) => {
    const ticket = await fetchTicketById(id);
    setSelectedTicket(ticket);
    setViewOpen(true);
  };

  const handleUserSearch = async () => {
    if (userId) {
      const result = await fetchTicketsByUserId(userId);
      setUserData(result); // Store the result in userData state
    }
  };
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="info"
            onClick={() => handleViewClick(params.row.id)}
            sx={{ marginRight: 1 }}
          >
            View
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={() => handleStatusUpdate(params.row, 'Approved')}
            sx={{ marginRight: 1 }}
          >
            Approve
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => handleStatusUpdate(params.row, 'Denied')}
          >
            Deny
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="TICKETS" subtitle="Managing Tickets" />

      {/* User ID Search */}
      <Box display="flex" mb={2}>
        <TextField
          label="User ID"
          variant="outlined"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" color="secondary" onClick={handleUserSearch}>
          Search
        </Button>
      </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={userData.length > 0 ? userData : data} columns={columns} />
      </Box>

      {/* Dialog for Viewing */}
      <Dialog open={viewOpen} onClose={() => setViewOpen(false)}>
        <DialogTitle>View Ticket</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Type"
            name="type"
            value={selectedTicket?.type || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="From Date"
            name="from_date"
            value={selectedTicket?.from_date || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="To Date"
            name="to_date"
            value={selectedTicket?.to_date || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={selectedTicket?.description || ''}
            fullWidth
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewOpen(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageTickets;
