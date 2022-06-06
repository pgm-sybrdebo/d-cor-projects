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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route
            path={ROUTES.LANDING}
            element={<Navigate to={ROUTES.ACTIVE_PROJECTS} replace />}
          />
          <Route path={ROUTES.ACTIVE_PROJECTS} element={<ActiveProjects />} />
          <Route path={ROUTES.PROJECTS} element={<Projects />} />
          <Route path={ROUTES.PROJECT} element={<Project />} />
          <Route path={ROUTES.CLIENTS} element={<Clients />} />
          <Route path={ROUTES.SUBCONTRACTORS} element={<Subcontractors />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
