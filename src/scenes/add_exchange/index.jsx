import React, { useState, useEffect } from 'react';
import { Box, Button, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { fetchVouchersData, fetchVoucherById,createExchange  } from "../../data/mockData"; // Import the API functions
const ManageVouchers = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [exchangeSuccess, setExchangeSuccess] = useState(null);
    const [page, setPage] = useState(0); // Trang hiện tại
    const [pageSize, setPageSize] = useState(10); // Số lượng bản ghi trên mỗi trang
    const [rowCount, setRowCount] = useState(0); // Tổng số bản ghi
    useEffect(() => {
      const getData = async () => {
        const vouchersData = await fetchVouchersData(page + 1, pageSize); // Gọi API với phân trang
        setData(vouchersData.users); // Cập nhật danh sách người dùng
        setRowCount(vouchersData.total); // Cập nhật tổng số bản ghi
      };
    
      getData();
    }, [page, pageSize]); // Gọi lại khi page hoặc pageSize thay đổi
  
    const handleViewClick = async (id) => {
      const voucher = await fetchVoucherById(id);
      setSelectedVoucher(voucher);
      setViewOpen(true);
    };
  
    const handleExchangeClick = async (id) => {
      const exchangeData = {
        voucher_id: id,
        user_id: 1, // This should be dynamically set based on the logged-in user
        exchange_date: new Date().toISOString(),
      };
  
      const response = await createExchange(exchangeData);
  
      if (response) {
        setExchangeSuccess(`Voucher ${id} exchanged successfully!`);
      } else {
        setExchangeSuccess('Exchange failed. Please try again.');
      }
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
              color="success"
              onClick={() => handleExchangeClick(params.row.id)}
            >
              Exchange
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
        >        <DataGrid
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
        {/* Display exchange success message */}
        {exchangeSuccess && (
          <Box mt={2} color={exchangeSuccess.includes('failed') ? 'red' : 'green'}>
            {exchangeSuccess}
          </Box>
        )}
      </Box>
    );
  };
  
  export default ManageVouchers;