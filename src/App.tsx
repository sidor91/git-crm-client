import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import ProjectList from "./pages/ProjectList";
import AddProject from "./pages/AddProject";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Container>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path="/" element={<ProjectList />} />
              <Route path="/add" element={<AddProject />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer />
        </Container>
      </AuthProvider>
    </Router>
  );
}

export default App;
