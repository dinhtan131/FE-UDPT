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
import { fetchTimeSheetData, updateTimesheetStatus } from "../../data/mockData";

const TimeSheetDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelectedTimesheet] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const timesheet_data = await fetchTimeSheetData();
      setData(timesheet_data);
    };

    getData();
  }, []);

  const handleUpdate = async (data_update) => {
    const updatedData = await updateTimesheetStatus(
      data_update.id,
      data_update.status
    );
    if (updatedData) {
      setData(
        data.map((timesheet) =>
          timesheet.id === data_update.id ? updatedData : timesheet
        )
      );
      setOpen(false);
    }
  };

  const handleEditClick = (timesheet) => {
    setSelectedTimesheet(timesheet);
    setOpen(true);
  };

  const handleInputChange = (e) => {
    setSelectedTimesheet({
      ...selected,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const columns = [
    { field: "id", headerName: "User ID" },
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
      <Header title="Update Status" subtitle="Update Status for TimeSheet" />
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
        <DialogTitle>Edit Timesheet Status</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Status"
            name="status"
            value={selected?.status || ""}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleUpdate(selected)} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TimeSheetDashboard;
