import React, { useState } from 'react';
import { Box, Button, TextField, useTheme, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { fetchWorkLogsData, fetchWorkLogById, updateWorkLog } from "../../data/mockData";

const ManageWorkLogs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [workLogs, setWorkLogs] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedWorkLog, setSelectedWorkLog] = useState(null); // Chứa WorkLog đang được xem/chỉnh sửa
  const [open, setOpen] = useState(false); // Quản lý trạng thái mở/đóng của dialog

  const handleSearch = async () => {
    if (startDate && endDate) {
      // Append fixed times to the selected dates
      const formattedStartDate = `${startDate}T00:00:00`;
      const formattedEndDate = `${endDate}T23:59:59`;
  
      const workLogsData = await fetchWorkLogsData(1, 10, formattedStartDate, formattedEndDate);
      setWorkLogs(workLogsData);
    }
  };
  

  // Hàm định dạng ngày
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleView = async (id) => {
    const workLog = await fetchWorkLogById(id);
    if (workLog) {
      setSelectedWorkLog(workLog);
      setOpen(true);
    }
  };

  const handleUpdate = async () => {
    if (selectedWorkLog) {
      const updatedWorkLog = await updateWorkLog(selectedWorkLog.id, selectedWorkLog);
      if (updatedWorkLog) {
        setWorkLogs((prevLogs) =>
          prevLogs.map((log) => (log.id === updatedWorkLog.id ? updatedWorkLog : log))
        );
        setOpen(false);
      }
    }
  };

  const handleInputChange = (e) => {
    setSelectedWorkLog({
      ...selectedWorkLog,
      [e.target.name]: e.target.value,
    });
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "user_id",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "check_in",
      headerName: "Check In",
      flex: 1,
      valueGetter: (params) => formatDate(params.value), // Format check_in date
    },
    {
      field: "check_out",
      headerName: "Check Out",
      flex: 1,
      valueGetter: (params) => formatDate(params.value), // Format check_out date
    },
    {
      field: "note",
      headerName: "Note",
      flex: 2,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleView(params.row.id)} // Only handle view on this button
            sx={{ marginRight: "5px" }}
          >
            View and Update
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="WORK LOGS" subtitle="Managing Work Logs" />

      {/* Date Search */}
      <Box display="flex" mb={2}>
      <TextField
        label="Start Date"
        variant="outlined"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value.split('T')[0])} // Strip out any time part
        sx={{ mr: 2 }}
        type="date"  // Use "date" type to hide the time picker
      />
      <TextField
        label="End Date"
        variant="outlined"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value.split('T')[0])} // Strip out any time part
        sx={{ mr: 2 }}
        type="date"  // Use "date" type to hide the time picker
      />
        <Button variant="contained" color="secondary" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      <Box
        m="40px 0 0 0"
        height="62vh"
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
        <DataGrid checkboxSelection rows={workLogs} columns={columns} />
      </Box>

      {/* Dialog for viewing and updating work logs */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>View Work Log</DialogTitle>
        <DialogContent>
          {selectedWorkLog && (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                name="check_in"
                label="Check In"
                value={selectedWorkLog.check_in || ""}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                name="check_out"
                label="Check Out"
                value={selectedWorkLog.check_out || ""}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                name="note"
                label="Note"
                value={selectedWorkLog.note || ""}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="secondary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageWorkLogs;
