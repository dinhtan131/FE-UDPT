import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import UpdateOutlined from "@mui/icons-material/UpdateOutlined";
import ChangeCircleOutlined from "@mui/icons-material/ChangeCircleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CheckOutlined from "@mui/icons-material/CheckOutlined";
import AddOutlined from "@mui/icons-material/AddOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import RequestPageOutlined from "@mui/icons-material/RequestPageOutlined";
import OutboundOutlined from "@mui/icons-material/OutboundOutlined";
import OutputOutlined from "@mui/icons-material/OutputOutlined";
import UploadTwoTone from "@mui/icons-material/LocalActivityOutlined";
import CurrencyExchange from "@mui/icons-material/CurrencyExchange";
import CheckroomOutlined from "@mui/icons-material/CheckCircle";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar1 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  EMPLOYEE
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/employee.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography variant="h5" color={colors.greenAccent[500]}>
                 Employee
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/employee"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Change Password"
              to="/employee/change_password"
              icon={<ChangeCircleOutlined />}
              selected={selected}
              setSelected={setSelected}
            />


            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Personal Management
            </Typography>
            
            <Item
              title="Check in-out"
              to="/employee/check"
              icon={<CheckOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="My Request"
              to="/employee/my_request"
              icon={<RequestPageOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="My Exchange"
              to="/employee/my_exchange"
              icon={<OutputOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="My Participation"
              to="/employee/my_participation"
              icon={<OutboundOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="My Check In"
              to="/employee/my_check_in"
              icon={<CheckroomOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            
            <Item
              title="My Time Sheet"
              to="/employee/my_time_sheet"
              icon={<CalendarMonthOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Activities
            </Typography>
            <Item
              title="Add Request"
              to="/employee/add_request"
              icon={<AddOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Join Activities"
              to="/employee/participation"
              icon={<UploadTwoTone />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Voucher Exchange"
              to="/employee/add_exchange"
              icon={<CurrencyExchange />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Create Time Sheet"
              to="/employee/add_time_sheet"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar1;
