import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginRegister from "./components/LoginRegister"; // Importando o componente de login e registro
import StartSection from "./components/StartSection";
import Profile from "./components/Profile";
import PharmacySection from "./components/PharmacySection";
import FaqSection from "./components/FaqSection";
import ClinicSection from "./components/ClinicSection";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica se o token está armazenado no localStorage para manter o usuário logado após refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // Usuário autenticado se o token existir
    }
  }, []);

  return (
    <Router>
      <div id="root">
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route
              path="/register"
              element={
                <LoginRegister setIsAuthenticated={setIsAuthenticated} />
              }
            />
            <Route
              path="/login"
              element={
                <LoginRegister setIsAuthenticated={setIsAuthenticated} />
              }
            />
            <Route
              path="/inicio"
              element={
                isAuthenticated ? <StartSection /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
            />
            <Route path="/farmacia" element={<PharmacySection />} />
            <Route path="/duvidas" element={<FaqSection />} />
            <Route path="/clinica" element={<ClinicSection />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
