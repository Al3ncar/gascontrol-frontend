import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({
  children,
  isAuthenticated,
  redirectTo = "/login",
}: any) => {
  const location = useLocation();
  isAuthenticated && (
    <Navigate to={redirectTo} state={{ from: location }} replace />
  );
  return <>{children}</>;
};

export default ProtectedRoute;
