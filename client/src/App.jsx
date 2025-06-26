import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register/Register.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./pages/login/Login.jsx";
import Home from "./pages/home/Home.jsx";
import LoginAccess from "./pages/login-access/LoginAccess.jsx";
import ProtectedRoute from "./protected/ProtectedRoute.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Vigilant from "./pages/vigilant/Vigilant.jsx";
import Visits from "./pages/vigilant/Visits.jsx";
import Schedules from "./pages/vigilant/Schedules.jsx";
import AdminCreateUser from "./pages/admin/AdminCreateUser.jsx";
import AdminDeleteUser from "./pages/admin/AdminDeleteUser.jsx";
import PayVigilance from "./pages/login-access/PayVigilance.jsx";
import AdminUpdateTask from "./pages/admin/AdminUpdateTask.jsx";
import Profile from "./pages/login-access/Profile.jsx";
import ProtectedRouteAdmin from "./protected/ProtectedRouteAdmin.jsx";
import ProtectedRouteVigilant from "./protected/ProtectedRouteVigilant.jsx";
import ProtectedRouteUser from "./protected/ProtectedRouteUser.jsx";
import ProfileUpdate from "./pages/login-access/ProfileUpdate.jsx";
import ProfileVigilant from "./pages/vigilant/ProfileVigilant.jsx";
import VigilantUpdate from "./pages/vigilant/VigilantUpdate.jsx";
import AdminUpdate from "./pages/admin/AdminUpdate.jsx";
import AdminProfile from "./pages/admin/AdminProfile.jsx";
import UserReport from "./pages/login-access/UserReport.jsx";
import UserAnuncios from "./pages/login-access/UserAnuncios.jsx";
import AdminCreateReports from "./pages/admin/AdminCreateReports.jsx";
import AdminCreateAnuncios from "./pages/admin/AdminCreateAnuncios.jsx";
import AdminUpdateTask2 from "./pages/admin/AdminUpdateTask2.jsx";
import AdminPayVigilance from "./pages/admin/AdminPayVigilance.jsx";
import Users from "./pages/login-access/Users.jsx";
import './index.css'

function App() {

  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}> /</Route>
            <Route path="/login" element={<Login />}> /</Route>
            <Route path="/register" element={<Register />}> /</Route>

            <Route element={<ProtectedRoute />} >

              <Route element={<ProtectedRouteUser />}>
                <Route path="/user" element={<LoginAccess />}> /</Route>
                <Route path="/userReport" element={<UserReport />} />
                <Route path="/userAnuncios" element={<UserAnuncios />} />
                <Route path="/profile/:id" element={<ProfileUpdate />} />
                <Route path="/payVigilance" element={<PayVigilance />}> /</Route>
                <Route path="/profile" element={<Profile />}> /</Route>
                <Route path="/allUsers" element={<Users />}> /</Route>
                <Route path="/userAnuncios" element={<UserAnuncios />}> /</Route>
                <Route path="/userReport" element={<UserReport />}> /</Route>
              </Route>

              <Route element={<ProtectedRouteVigilant />}>
                <Route path="/vigilant" element={<Vigilant />}> /</Route>
                <Route path="/visits" element={<Visits />}> /</Route>
                <Route path="/profileVigilant" element={<ProfileVigilant />} />
                <Route path="/editVigilant/:id" element={<VigilantUpdate />} />
                <Route path="/schedules" element={<Schedules />}> /</Route>
              </Route>

              <Route element={<ProtectedRouteAdmin />}>
                <Route path="/admin" element={<Admin />}> /</Route>
                <Route path="/profileAdmin" element={<AdminProfile />} />
                <Route path="/editAdmin/:id" element={<AdminUpdate />} />
                <Route path="/task/:id" element={<AdminUpdateTask />}> /</Route>
                <Route path="/taskd/:id" element={<AdminUpdateTask2 />}> /</Route>
                <Route path="/admincreate" element={<AdminCreateUser />}> /</Route>
                <Route path="/admindelete" element={<AdminDeleteUser />}> /</Route>
                <Route path="/admincreatereports" element={<AdminCreateReports />}> /</Route>
                <Route path="/admincreateanuncios" element={<AdminCreateAnuncios />}> /</Route>
                <Route path="/adminpayvigilance" element={<AdminPayVigilance />}> /</Route>
              </Route>

            </Route>

          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App;