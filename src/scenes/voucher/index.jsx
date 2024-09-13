import React, { useState, useEffect } from 'react';
import { Box, Button, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { fetchVouchersData, updateVoucher, fetchVoucherById } from "../../data/mockData"; // Import the API functions

const ManageVouchers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const vouchersData = await fetchVouchersData();
      setData(vouchersData);
    };

    getData();
  }, []);

  const handleUpdate = async (updatedVoucher) => {
    const updatedData = await updateVoucher(updatedVoucher.id, updatedVoucher);
    if (updatedData) {
      setData(data.map((voucher) => (voucher.id === updatedVoucher.id ? updatedData : voucher)));
      setOpen(false);
    }
  };

  const handleViewClick = async (id) => {
    const voucher = await fetchVoucherById(id);
    setSelectedVoucher(voucher);
    setViewOpen(true);
  };

  const handleEditClick = (voucher) => {
    setSelectedVoucher(voucher);
    setOpen(true);
  };

  const handleInputChange = (e) => {
    setSelectedVoucher({
      ...selectedVoucher,
      [e.target.name]: e.target.value,
    });
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "provider",
      headerName: "Type",
      flex: 0.5,
    },
    {
        field: "description",
        headerName: "Description",
        flex: 1,
      },
    {
      field: "require_point",
      headerName: "Require Point",
      flex: 1,
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
            color="primary"
            onClick={() => handleEditClick(params.row)}
            sx={{ marginRight: 1 }}
          >
            Edit
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="VOUCHERS" subtitle="Managing Vouchers" />
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
        <DataGrid checkboxSelection rows={data} columns={columns} />
      </Box>

      {/* Dialog for Editing */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Voucher</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            value={selectedVoucher?.title || ''}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={selectedVoucher?.description || ''}
            onChange={handleInputChange}
            fullWidth
          />
           <TextField
            margin="dense"
            label="Require Point"
            name="require_point"
            value={selectedVoucher?.require_point || ''}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleUpdate(selectedVoucher)} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Viewing */}
      <Dialog open={viewOpen} onClose={() => setViewOpen(false)}>
        <DialogTitle>View Voucher</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Type"
            name="provider"
            value={selectedVoucher?.provider || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Title"
            name="title"
            value={selectedVoucher?.title || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={selectedVoucher?.description || ''}
            fullWidth
            disabled
          />
          
          <TextField
            margin="dense"
            label="Require Point"
            name="require_point"
            value={selectedVoucher?.require_point || ''}
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

export default ManageVouchers;
