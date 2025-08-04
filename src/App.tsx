import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import PracticePage from "@/pages/PracticePage";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/episodes" element={<Home />} />
          <Route path="/practice" element={<PracticePage />} />
        </Routes>
    </AuthContext.Provider>
  );
}
