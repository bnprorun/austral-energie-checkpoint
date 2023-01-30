import { Route, Routes } from "react-router-dom";
import AdminRoute from "./components/AdminRoute";
import Dashboard from "./pages/admin/Dashboard";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<Dashboard />} />
      </Route>
      <Route path="/connexion" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
