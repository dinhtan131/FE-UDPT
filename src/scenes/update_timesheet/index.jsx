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
} from "@mui/material";
import { fetchTimeSheetData } from "../../data/mockData";

const TimeSheetDashboard = () => {
  const [timeSheets, setTimeSheets] = useState([]);

  useEffect(() => {
    const getTimeSheets = async () => {
      const data = await fetchTimeSheetData();
      setTimeSheets(data);
    };

    getTimeSheets();
  }, []);

  return (
    <Box m="20px">
      <Typography variant="h4" mb={2} color="#48D1CC">
        Timesheet Overview
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
            {timeSheets.map((sheet) => (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TimeSheetDashboard;
