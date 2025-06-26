import React, { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Complaints from "./pages/Complaints";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "users":
        return <Users />;
      case "complaints":
        return <Complaints />;
      // case "settings":
      //   return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  // Handle navigation from layout
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && ["dashboard", "users", "complaints"].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <AuthProvider>
      <ProtectedRoute>
        <Layout>{renderPage()}</Layout>
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default App;
