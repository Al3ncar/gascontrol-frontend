import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../features/auth/pages/LoginPage";
import SignUp from "../features/auth/pages/SignUp";
import Empty from "../components/empty/empty";
// import GasControlSystem from "../components/registerGasometros/register";
// import DashboardPage from '@/features/dashboard/pages/DashboardPage'
// import MetersPage from '@/features/meters/pages/MetersPage'
// import ReadingsPage from '@/features/readings/pages/ReadingsPage'
// import AlertsPage from '@/features/alerts/pages/AlertsPage'
// import ChartsDashboard from "../features/dashboard/charts-dashborad";
import Dashboard from "../features/dashboard/dashboard";

export const AppRoutes = () => {
  const [isValidWelcome, setValidWelcome] = useState<any>(false);
  const [showNot, setShowNot] = useState<any>(false);

  useEffect(() => {
    const getStoredToken = localStorage.getItem("user");
    setValidWelcome(!!getStoredToken);
    if (!isValidWelcome && location.href === "http://localhost:5173/")
      location.href = "/login";
  }, []);

  let validShow = false;

  const getValidStatus = (valid: boolean) => {
    console.log("Valid", valid);
    setValidWelcome(valid);
    validShow = valid;

    valid && (location.href = "/dashboards");
  };

  useEffect(() => {
    setTimeout(() => {
      setShowNot(true);
    }, 500);
  }, []);

  useEffect(() => {
    console.log(isValidWelcome);
  }, [isValidWelcome]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={"/login"}
            element={
              <LoginPage isValid={(valid: boolean) => getValidStatus(valid)} />
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboards"
            element={
              <ProtectedRoute isAuthenticated={isValidWelcome || validShow}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* 
            User: admin123
            password: admin123admin123
          */}

          {showNot && !isValidWelcome && <Route path="*" element={<Empty />} />}
        </Routes>
      </BrowserRouter>
    </>
  );
};
