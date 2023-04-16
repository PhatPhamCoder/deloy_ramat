import { Navigate } from "react-router-dom";
export const PrivateRoutes = ({ children }) => {
  const getTokenFromLocalStorge = JSON.parse(localStorage.getItem("customer"));
  return getTokenFromLocalStorge?.token !== undefined ? (
    children
  ) : (
    <Navigate to="/login" replace={true} />
  );
};
