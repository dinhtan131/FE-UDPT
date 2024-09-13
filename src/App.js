import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from "./scenes/login";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import ChangePassword from "./scenes/change_password";
import MyRequest from "./scenes/my_request";
import MyExchange from "./scenes/my_exchange";
import MyParticipation from "./scenes/my_participation";
import MyCheckIn from "./scenes/my_check_in";
import Team from "./scenes/team";
import Activities from "./scenes/activities";
import PointTransfer from "./scenes/point_transfer";
import Voucher from "./scenes/voucher";
import Exchange from "./scenes/exchange";
import WorkLog from "./scenes/work_log";
import AddUser from "./scenes/add_user";
import AddActivity from "./scenes/add_activity";
import AddVoucher from "./scenes/add_voucher";
import AddPoinTrasnfer from "./scenes/add_point_transfer";
import Request from "./scenes/request";
import Sidebar1 from "./scenes/global/Sidebar1";
import Calendar from "./scenes/calendar/calendar";
import AddRequest from "./scenes/add_request";
import AddExchange from "./scenes/add_exchange";
import TimeSheet from "./scenes/time_sheet";
import Check from "./scenes/check_in-out";
import AddParticipation from "./scenes/add_participation";
import AddTimeSheet from "./scenes/add_time_sheet";
import MyTimeSheet from "./scenes/my_time_sheet";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  // Kiểm tra nếu route hiện tại là trang đăng nhập
  const isLoginPage = location.pathname === "/";

  // Xác định sidebar nào sẽ hiển thị
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isEmployeeRoute = location.pathname.startsWith("/employee");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isLoginPage && (
            <>
              {isAdminRoute && <Sidebar isSidebar={isSidebar} />}
              {isEmployeeRoute && <Sidebar1 isSidebar={isSidebar} />}
            </>
          )}
          <main className="content">
            {!isLoginPage && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              {/* Route dành cho trang login */}
              <Route path="/" element={<Login />} />

              {/* Các route dành cho admin */}
              <Route path="/admin" element={<Dashboard />} />
              <Route
                path="/admin/change_password"
                element={<ChangePassword />}
              />
              <Route path="/admin/team" element={<Team />} />
              <Route path="/admin/activities" element={<Activities />} />
              <Route path="/admin/add_user" element={<AddUser />} />
              <Route path="/admin/add_activity" element={<AddActivity />} />
              <Route path="/admin/request" element={<Request />} />
              <Route path="/admin/voucher" element={<Voucher />} />
              <Route path="/admin/add_voucher" element={<AddVoucher />} />
              <Route path="/admin/exchange" element={<Exchange />} />
              <Route path="/admin/point_transfer" element={<PointTransfer />} />
              <Route path="/admin/add_point_transfer" element={<AddPoinTrasnfer />} />
              <Route path="/admin/work_log" element={<WorkLog />} />
              <Route path="/admin/my_time_sheet" element={<MyTimeSheet />} />
              <Route path="/admin/time_sheet" element={<TimeSheet />} />

              {/**/}
              <Route path="/admin/my_request" element={<MyRequest />} />
              <Route path="/admin/my_exchange" element={<MyExchange />} />
              <Route path="/admin/check" element={<Check />} />

              {/* Các route dành cho employee */}
              <Route path="/employee" element={<Dashboard />} />
              <Route
                path="/employee/change_password"
                element={<ChangePassword />}
              />
              <Route path="/employee/calendar" element={<Calendar />} />
              <Route path="/employee/add_request" element={<AddRequest />} />
              <Route path="/employee/add_activity" element={<AddActivity />} />
              <Route path="/employee/my_request" element={<MyRequest />} />
              <Route path="/employee/my_exchange" element={<MyExchange />} />
              <Route
                path="/employee/my_participation"
                element={<MyParticipation />}
              />
              <Route path="/employee/my_check_in" element={<MyCheckIn />} />
              <Route path="/employee/check" element={<Check />} />
              <Route
                path="/employee/participation"
                element={<AddParticipation />}
              />
              <Route path="/employee/add_exchange" element={<AddExchange />} />
              <Route
                path="/employee/add_time_sheet"
                element={<AddTimeSheet />}
              />
              <Route path="/employee/my_time_sheet" element={<MyTimeSheet />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
