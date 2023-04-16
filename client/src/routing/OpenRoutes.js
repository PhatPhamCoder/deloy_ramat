import { Navigate } from "react-router-dom";
export const OpenRoutes = ({ children }) => {
  const getTokenFromLocalStorge = JSON.parse(localStorage.getItem("customer"));
  return getTokenFromLocalStorge?.token === undefined ? (
    children
  ) : (
    <Navigate to="/" replace={true} />
  );
};
