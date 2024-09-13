import React, { useState, useEffect } from 'react';
import { Box, Button, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { fetchTeamData, deleteUser, updateUser, fetchUserById, createPointTransfer } from "../../data/mockData"; 

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0); // Trang hiện tại
  const [pageSize, setPageSize] = useState(10); // Số lượng bản ghi trên mỗi trang
  const [rowCount, setRowCount] = useState(0); // Tổng số bản ghi
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false); // New state for Point Transfer
  const [formData, setFormData] = useState({ points: '', description: '' }); // State for transfer form

  useEffect(() => {
    const getData = async () => {
      const teamData = await fetchTeamData(page + 1, pageSize); // Gọi API với phân trang
      setData(teamData.users); // Cập nhật danh sách người dùng
      setRowCount(teamData.total); // Cập nhật tổng số bản ghi
    };
  
    getData();
  }, [page, pageSize]);

  const handleDelete = async (id) => {
    const isDeleted = await deleteUser(id);
    if (isDeleted) {
      setData(data.filter((user) => user.id !== id));
    }
  };

  const handleUpdate = async (updatedUser) => {
    const updatedData = await updateUser(updatedUser.id, updatedUser);
    if (updatedData) {
      setData(data.map((user) => (user.id === updatedUser.id ? updatedData : user)));
      setOpen(false);
    }
  };

  const handleViewClick = async (id) => {
    const user = await fetchUserById(id);
    setSelectedUser(user);
    setViewOpen(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleTransferClick = (user) => {
    setSelectedUser(user);
    setFormData({ points: '', description: '' });
    setTransferOpen(true);
  };

  const handleTransferSubmit = async () => {
    try {
      const response = await createPointTransfer({
        to_user_id: selectedUser.id, // Automatically use selected user's ID
        points: formData.points,
        description: formData.description,
      });
      if (response) {
        alert('Point transfer created successfully!');
        setTransferOpen(false);
      } else {
        alert('Failed to create point transfer.');
      }
    } catch (error) {
      console.error('Error creating point transfer:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "full_name", headerName: "Full Name", flex: 0.5 },
    { field: "username", headerName: "User Name", flex: 0.5, cellClassName: "name-column--cell" },
    { field: "role", headerName: "Role", flex: 0.25 },
    { field: "bonus_point", headerName: "Bonus Point", align: "left", flex: 0.25 },
    {
      field: "actions", headerName: "Actions", flex: 1,
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
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.row.id)}
            sx={{ marginRight: 1 }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleTransferClick(params.row)}
          >
            Point Transfer
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
        <DataGrid
  checkboxSelection
  rows={data}
  columns={columns}
  pageSize={pageSize} // Số bản ghi trên mỗi trang
  rowsPerPageOptions={[5, 10, 25]} // Các tùy chọn số bản ghi
  rowCount={rowCount} // Tổng số bản ghi
  paginationMode="server" // Sử dụng phân trang từ server
  onPageChange={(newPage) => setPage(newPage)} // Cập nhật khi trang thay đổi
  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)} // Cập nhật số bản ghi trên mỗi trang
/>

      </Box>

      {/* Dialog for Editing */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Full Name"
            name="full_name"
            value={selectedUser?.full_name || ''}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Citizen_id"
            name="citizen_id"
            value={selectedUser?.citizen_id || ''}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Bank Number"
            name="bank_number"
            value={selectedUser?.bank_number || ''}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Tax ID"
            name="tax_id"
            value={selectedUser?.tax_id || ''}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleUpdate(selectedUser)} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Viewing */}
      <Dialog open={viewOpen} onClose={() => setViewOpen(false)}>
        <DialogTitle>View User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Full Name"
            name="full_name"
            value={selectedUser?.full_name || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Citizen ID"
            name="citizen_id"
            value={selectedUser?.citizen_id || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Username"
            name="username"
            value={selectedUser?.username || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Bank Number"
            name="bank_number"
            value={selectedUser?.bank_number || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Tax ID"
            name="tax_id"
            value={selectedUser?.tax_id || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Role"
            name="role"
            value={selectedUser?.role || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Bonus Point"
            name="bonus_point"
            value={selectedUser?.bonus_point || ''}
            fullWidth
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Point Transfer */}
 {/* Dialog for Point Transfer */}
 <Dialog open={transferOpen} onClose={() => setTransferOpen(false)}>
        <DialogTitle>Point Transfer</DialogTitle>
        <DialogContent>
          <TextField
            label="Points"
            name="points"
            type="number"
            value={formData.points}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTransferOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleTransferSubmit} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Team;
