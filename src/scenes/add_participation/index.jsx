import React, { useState, useEffect } from 'react';
import { Box, Button, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { fetchActivitiesData, fetchActivityById ,createParticipation} from "../../data/mockData"; // Import the API functions

const ManageActivities = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [page, setPage] = useState(0); // Trang hiện tại
const [pageSize, setPageSize] = useState(10); // Số lượng bản ghi trên mỗi trang
const [rowCount, setRowCount] = useState(0); // Tổng số bản ghi


useEffect(() => {
  const getData = async () => {
    const activitiesData = await fetchActivitiesData(page + 1, pageSize); // Gọi API với phân trang
    setData(activitiesData.users); // Cập nhật danh sách người dùng
    setRowCount(activitiesData.total); // Cập nhật tổng số bản ghi
  };

  getData();
}, [page, pageSize]); // Gọi lại khi page hoặc pageSize thay đổi

  const handleViewClick = async (id) => {
    const activity = await fetchActivityById(id);
    setSelectedActivity(activity);
    setViewOpen(true);
  };

  const handleJoinClick = async (activityId) => {
    const participationData = {
      activity_id: activityId,
    };
  
    const response = await createParticipation(participationData);
    
    if (response) {
      console.log("Successfully joined the activity!");
      // Optionally, you can refresh the activities list or display a success message
    } else {
      console.error("Failed to join the activity.");
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
      field: "title",
      headerName: "Title",
      flex: 0.5,
    },
    {
      field: "description",
      headerName: "Description",
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
          color="success"
          onClick={() => handleJoinClick(params.row.id)} // Add this line
        >
          Join
        </Button>

        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="ACTIVITIES" subtitle="Join Activities" />
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


      {/* Dialog for Viewing */}
      <Dialog open={viewOpen} onClose={() => setViewOpen(false)}>
        <DialogTitle>View Activity</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Type"
            name="type"
            value={selectedActivity?.type || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="From Date"
            name="from_date"
            value={selectedActivity?.from_date || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="To Date"
            name="to_date"
            value={selectedActivity?.to_date || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Title"
            name="title"
            value={selectedActivity?.title || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={selectedActivity?.description || ''}
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

export default ManageActivities;
