import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./theme/globalStyles";
import theme from "./theme/theme";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
  useNavigate,
} from "react-router-dom";
import * as ROUTES from "./routes";
import {
  ActiveProjects,
  Projects,
  Subcontractors,
  Clients,
  Project,
} from "./pages";
import NewReport from "./pages/NewReport";
import jwt_decode from "jwt-decode";
import { TokenInfo } from "./interfaces";
import { UserProvider } from "./context/AuthenticationContext";
import Login from "./pages/Login";

const RequireAuth = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const token = localStorage.getItem("D-corprojectsToken");
  console.log("token", token);

  if (!token) {
    console.log("no token");
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (token) {
    const userData = jwt_decode<TokenInfo>(token);
    console.log("userData", userData);
    if (userData.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }

  return <Outlet />;
};

function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route element={<RequireAuth />}>
              <Route
                path={ROUTES.LANDING}
                element={<Navigate to={ROUTES.ACTIVE_PROJECTS} replace />}
              />
              <Route
                path={ROUTES.ACTIVE_PROJECTS}
                element={<ActiveProjects />}
              />
              <Route path={ROUTES.PROJECTS} element={<Projects />} />
              <Route path={ROUTES.PROJECT} element={<Project />} />
              <Route path={ROUTES.CLIENTS} element={<Clients />} />
              <Route
                path={ROUTES.SUBCONTRACTORS}
                element={<Subcontractors />}
              />
              <Route path={ROUTES.NEW_REPORT} element={<NewReport />} />
            </Route>
            <Route path={ROUTES.LOGIN} element={<Login />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
