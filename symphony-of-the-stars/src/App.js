import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LaunchPage from "./pages/launch";
import MainPage from "./pages/main";
import { UserInteractionProvider } from "./UserInteractionContext";

function App() {
  return (
    <UserInteractionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LaunchPage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Router>
    </UserInteractionProvider>
  );
}

export default App;
