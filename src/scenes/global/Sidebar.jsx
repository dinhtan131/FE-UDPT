import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import ChangeCircleOutlined from "@mui/icons-material/ChangeCircleOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import RequestPageOutlined from "@mui/icons-material/RequestPageOutlined";
import AddOutlined from "@mui/icons-material/AddOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PointOfSale from "@mui/icons-material/Money";
import TrackChanges from "@mui/icons-material/TrackChanges";
import Check from "@mui/icons-material/Check";
import VolunteerActivism from "@mui/icons-material/VolunteerActivism";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

import CurrencyExchange from "@mui/icons-material/CurrencyExchange";

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

const Sidebar = () => {
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
                  ADMINIS
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
                  src={`../../assets/admin.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="My TimeSheet"
              to="/admin/my_time_sheet"
              icon={<AccessTimeIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Change Password"
              to="/admin/change_password"
              icon={<ChangeCircleOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            {/*
            <Item
              title="My Request"
              to="/admin/my_request"
              icon={<RequestPage />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="My Exchange"
              to="/admin/my_exchange"
              icon={<TrackChanges />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Check In"
              to="/admin/check"
              icon={<Check />}
              selected={selected}
              setSelected={setSelected}
            />
            */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Employee Management
            </Typography>
            <Item
              title="Manage Team"
              to="/admin/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Timesheet Management"
              to="/admin/time_sheet"
              icon={<AccessTimeIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Add User"
              to="/admin/add_user"
              icon={<AddOutlined />}
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
              title="Manage Activities"
              to="/admin/activities"
              icon={<TrackChanges />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Activity"
              to="/admin/add_activity"
              icon={<AddOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Request
            </Typography>
            <Item
              title="Manage Request"
              to="/admin/request"
              icon={<RequestPageOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Work_log
            </Typography>
            <Item
              title="Manage Work Log"
              to="/admin/work_log"
              icon={<Check />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Voucher
            </Typography>
            <Item
              title="Manage Voucher"
              to="/admin/voucher"
              icon={<VolunteerActivism />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Exchange"
              to="/admin/exchange"
              icon={<CurrencyExchange />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Voucher"
              to="/admin/add_voucher"
              icon={<AddOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Point Transfer
            </Typography>
            <Item
              title="Manage Point Transfer"
              to="/admin/point_transfer"
              icon={<PointOfSale />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Activity"
              to="/admin/add_point_transfer"
              icon={<AddOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
