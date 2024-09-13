import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import {
  fetchUserById,
  fetchActivitiesData,
  updateActivity,
  fetchActivityById,
  fetchList,
} from "../../data/mockData"; // Import the fetchList function

const ManageActivities = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0); // Trang hiện tại
  const [pageSize, setPageSize] = useState(10); // Số lượng bản ghi trên mỗi trang
  const [rowCount, setRowCount] = useState(0); // Tổng số bản ghi

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false); // State to manage the list dialog
  const [participants, setParticipants] = useState([]); // State to store participant data

  useEffect(() => {
    const getData = async () => {
      const activitiesData = await fetchActivitiesData(page + 1, pageSize); // Gọi API với phân trang
      setData(activitiesData.users); // Cập nhật danh sách người dùng
      setRowCount(activitiesData.total); // Cập nhật tổng số bản ghi
    };

    getData();
  }, [page, pageSize]); // Gọi lại khi page hoặc pageSize thay đổi

  const handleUpdate = async (updatedActivity) => {
    const updatedData = await updateActivity(
      updatedActivity.id,
      updatedActivity
    );
    if (updatedData) {
      setData(
        data.map((activity) =>
          activity.id === updatedActivity.id ? updatedData : activity
        )
      );
      setOpen(false);
    }
  };

  const handleViewClick = async (id) => {
    const activity = await fetchActivityById(id);
    setSelectedActivity(activity);
    setViewOpen(true);
  };

  const handleEditClick = (activity) => {
    setSelectedActivity(activity);
    setOpen(true);
  };

  const handleListClick = async (activityId) => {
    const participantsData = await fetchList(activityId);
    if (participantsData) {
      const namesArray = [];
      const Point = [];
      for (let i = 0; i < participantsData.data.length; i++) {
        const userdata = await fetchUserById(participantsData.data[i].id);
        namesArray.push(userdata.username);
        Point.push(participantsData.data[i].activity_points);
      }

      setParticipants(namesArray);
      setListOpen(true);
    }
  };

  const handleInputChange = (e) => {
    setSelectedActivity({
      ...selectedActivity,
      [e.target.name]: e.target.value,
    });
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
            color="primary"
            onClick={() => handleEditClick(params.row)}
            sx={{ marginRight: 1 }}
          >
            Edit
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleListClick(params.row.id)} // Trigger the fetchList function
          >
            List
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="ACTIVITIES" subtitle="Managing Activities" />
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
        <DialogTitle>Edit Activity</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="From Date"
            name="from_date"
            value={selectedActivity?.from_date || ""}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="To Date"
            name="to_date"
            value={selectedActivity?.to_date || ""}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Title"
            name="title"
            value={selectedActivity?.title || ""}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={selectedActivity?.description || ""}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => handleUpdate(selectedActivity)}
            color="secondary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Viewing */}
      <Dialog open={viewOpen} onClose={() => setViewOpen(false)}>
        <DialogTitle>View Activity</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Type"
            name="type"
            value={selectedActivity?.type || ""}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="From Date"
            name="from_date"
            value={selectedActivity?.from_date || ""}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="To Date"
            name="to_date"
            value={selectedActivity?.to_date || ""}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Title"
            name="title"
            value={selectedActivity?.title || ""}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={selectedActivity?.description || ""}
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

      {/* Dialog for Listing Participants */}
      <Dialog open={listOpen} onClose={() => setListOpen(false)}>
        <DialogTitle>Participants</DialogTitle>
        <DialogContent>
          {participants.length > 0 ? (
            participants.map((participant, index) => (
              <Box key={index} mb={2}>
                <TextField
                  label="Name Participant"
                  value={participant || ""}
                  fullWidth
                  disabled
                />
              </Box>
            ))
          ) : (
            <Box>No participants found.</Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setListOpen(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageActivities;
