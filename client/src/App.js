import "./App.css";
import { NavBar } from "./components/NavBar";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { ChatForm } from "./components/ChatForm";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/AdminPage/Login";
import { Otp } from "./components/AdminPage/Otp";
import { VerifyOtp } from "./AuthRoutes/VerifyOtp";
import { OpenRoute } from "./AuthRoutes/OpenRoute";
import { Dashboard } from "./components/AdminPage/Dashboard";
import { PrivateRoute } from "./AuthRoutes/PrivateRoute";
import { ProjectDashboard } from "./components/AdminPage/ProjectDashboard";
import { EditProfile } from "./components/AdminPage/EditProfile";
import { ContactMessage } from "./components/AdminPage/ContactMessage";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
           <div className="overflow-hidden w-full min-h-screen">
            <NavBar />
            <HomePage/>
            <AboutPage />
            <div>
              <Projects/>
              <Skills />
            </div>
            <ChatForm />
          </div>
        }
      />
      <Route
        path="/admin/login"
        element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        }
      />
      <Route
        path="/admin/otp"
        element={
          <VerifyOtp>
            <Otp />
          </VerifyOtp>
        }
      />
      <Route element={
        <PrivateRoute>
      <Dashboard/>
      </PrivateRoute>
      }>
      <Route path="/admin/dashboard/project-dashboard" element={<ProjectDashboard/>}/>
      <Route path="/admin/dashboard/edit-profile" element={<EditProfile/>}/>
      <Route path="/admin/dashboard/contact-message" element={<ContactMessage/>}/>
      </Route>
      <Route path="*" element={
        <div className="flex h-screen w-screen items-center justify-center text-5xl font-dmsans font-bold">404 PAGE NOT FOUND!!</div>
      }/>
    </Routes>
  );
}

export default App;
