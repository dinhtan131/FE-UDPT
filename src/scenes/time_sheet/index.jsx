import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { fetchTimeSheetData, updateTimesheetStatus } from "../../data/mockData";
import Header from "../../components/Header";

const TimeSheetDashboard = () => {
  const [timeSheets, setTimeSheets] = useState([]);

  useEffect(() => {
    const getTimeSheets = async () => {
      const data = await fetchTimeSheetData();
      setTimeSheets(data);
    };

    getTimeSheets();
  }, []);

  // Function to handle status update
  const handleApprove = async (id) => {
    const result = await updateTimesheetStatus(id, "approved");
    if (result) {
      // If update is successful, refresh the timesheet data
      const data = await fetchTimeSheetData();
      setTimeSheets(data);
    }
  };

  return (
    <Box m="20px">
      <Typography variant="h4" mb={2} color="#48D1CC">
        <Header title="Time Sheet" subtitle="Managing the Time Sheet Members" />
      </Typography>

      {/* Current Value Table */}
      <Typography variant="h6" mb={2} color="yellow">
        Work schedule waiting for approval
      </Typography>
      <TableContainer component={Paper} mb={4}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Monday</TableCell>
              <TableCell>Tuesday</TableCell>
              <TableCell>Wednesday</TableCell>
              <TableCell>Thursday</TableCell>
              <TableCell>Friday</TableCell>
              <TableCell>Saturday</TableCell>
              <TableCell>Sunday</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell> {/* New column for actions */}
            </TableRow>
          </TableHead>
          <TableBody>
            {timeSheets
              .filter((sheet) => sheet.status === "pending")
              .map((sheet) => (
                <TableRow key={sheet.id}>
                  <TableCell>{sheet.user_id}</TableCell>
                  <TableCell>
                    {sheet.current_value.monday.is_leave ? "Leave" : "Work"}
                  </TableCell>
                  <TableCell>
                    {sheet.current_value.tuesday.is_leave ? "Leave" : "Work"}
                  </TableCell>
                  <TableCell>
                    {sheet.current_value.wednesday.is_leave ? "Leave" : "Work"}
                  </TableCell>
                  <TableCell>
                    {sheet.current_value.thursday.is_leave ? "Leave" : "Work"}
                  </TableCell>
                  <TableCell>
                    {sheet.current_value.friday.is_leave ? "Leave" : "Work"}
                  </TableCell>
                  <TableCell>
                    {sheet.current_value.saturday.is_leave ? "Leave" : "Work"}
                  </TableCell>
                  <TableCell>
                    {sheet.current_value.sunday.is_leave ? "Leave" : "Work"}
                  </TableCell>
                  <TableCell>{sheet.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleApprove(sheet.id)}
                    >
                      Approve
                    </Button>
                  </TableCell>{" "}
                  {/* Action cell for approve button */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Previous Value Table */}
      <Typography variant="h6" mb={2} color="#48D1CC">
        Working schedule after being approved
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Monday</TableCell>
              <TableCell>Tuesday</TableCell>
              <TableCell>Wednesday</TableCell>
              <TableCell>Thursday</TableCell>
              <TableCell>Friday</TableCell>
              <TableCell>Saturday</TableCell>
              <TableCell>Sunday</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeSheets
              .filter((sheet) => sheet.status === "approved")
              .map((sheet) => (
                <TableRow key={sheet.id}>
                  <TableCell>{sheet.user_id}</TableCell>
                  <TableCell>
                    {sheet.previous_value.monday.is_leave ? "Leave" : "Work"}
                  </TableCell>
                  <TableCell>
                    {sheet.previous_value.tuesday.is_leave ? "Leave" : "Work"}
                  </TableCell>
                  <TableCell>
                    {sheet.previous_value.wednesday.is_leave ? "Leave" : "Work"}
                  </TableCell>
                  <TableCell>
                    {sheet.previous_value.thursday.is_leave ? "Leave" : "Work"}
                  </TableCell>
                  <TableCell>
                    {sheet.previous_value.friday.is_leave ? "Leave" : "Work"}
                  </TableCell>
                  <TableCell>
                    {sheet.previous_value.saturday.is_leave ? "Leave" : "Work"}
                  </TableCell>
                  <TableCell>
                    {sheet.previous_value.sunday.is_leave ? "Leave" : "Work"}
                  </TableCell>
                  <TableCell>{sheet.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TimeSheetDashboard;
