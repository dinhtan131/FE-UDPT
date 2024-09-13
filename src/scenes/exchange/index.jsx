import React, { useState, useEffect } from 'react';
import { Box, Button, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { fetchVoucherExchangesData, fetchVoucherExchangeById } from "../../data/mockData"; // Import the API functions

const ManageVoucherExchange = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0); // Trang hiện tại
const [pageSize, setPageSize] = useState(10); // Số lượng bản ghi trên mỗi trang
const [rowCount, setRowCount] = useState(0); // Tổng số bản ghi

  const [selectedExchange, setSelectedExchange] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const voucherExchangesData = await fetchVoucherExchangesData(page + 1, pageSize); // Gọi API với phân trang
      setData(voucherExchangesData.users); // Cập nhật danh sách người dùng
      setRowCount(voucherExchangesData.total); // Cập nhật tổng số bản ghi
    };
  
    getData();
  }, [page, pageSize]); // Gọi lại khi page hoặc pageSize thay đổi
  

  const handleViewClick = async (id) => {
    const exchange = await fetchVoucherExchangeById(id);
    setSelectedExchange(exchange);
    setViewOpen(true);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "user_id",
      headerName: "User ID",
      flex: 0.5,
    },
    {
      field: "voucher_title",
      headerName: "Voucher Title",
      flex: 0.5,
    },
    {
        field: "voucher_description",
        headerName: "Description",
        flex: 0.5,
    },
    {
      field: "point_used",
      headerName: "Points",
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

        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="VOUCHER EXCHANGES" subtitle="Managing Voucher Exchanges" />
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
        <DialogTitle>View Voucher Exchange</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Voucher Title"
            name="voucher_title"
            value={selectedExchange?.voucher_title || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Description"
            name="voucher_description"
            value={selectedExchange?.voucher_description || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="is_used"
            name="is_used"
            value={selectedExchange?.is_used || ''}
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

export default ManageVoucherExchange;
