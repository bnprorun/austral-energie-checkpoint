import React from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthenticationContext from "../context/AuthenticationContext";
import UserContext from "../context/UserContext";
import AdminLayout from "../layout/AdminLayout";

const AdminRoute = ({ children }) => {
  const { isAuth } = useContext(AuthenticationContext);
  const { user } = useContext(UserContext);
  return isAuth && user.admin ? (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ) : (
    <>{isAuth ? <Navigate to="/" /> : <Navigate to="/connexion" />}</>
  );
};

export default AdminRoute;
