import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LaunchPage from "./pages/launch";
import MainPage from "./pages/main";
import { UserInteractionProvider } from "./UserInteractionContext";
import AtmospheresOfDistantWorldsPage from "./pages/discoveries/AtmospheresOfDistantWorlds";
import DeepestInfraredImagePage from "./pages/discoveries/DeepestInfraredImage"
import AncientMassiveGalaxiesPage from "./pages/discoveries/AncientMassiveGalaxies"
import StarFormationInNebulaePage from "./pages/discoveries/StarFormationInNebulae"
import EarlyUniversePage from "./pages/discoveries/EarlyUniverse";
import WaterOnExoplanetsPage from "./pages/discoveries/WaterOnExoplanets";

function App() {
  return (
    <UserInteractionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LaunchPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route
            path="/atmospheres-of-distant-worlds"
            element={<AtmospheresOfDistantWorldsPage />}
          />
          <Route
            path="/deepest-infrared-image"
            element={<DeepestInfraredImagePage />}
          />
          <Route
            path="/ancient-massive-galaxies"
            element={<AncientMassiveGalaxiesPage />}
          />
          <Route
            path="/star-formation-in-nebulae"
            element={<StarFormationInNebulaePage />}
          />
          <Route
            path="/early-universe"
            element={<EarlyUniversePage />}
          />
          <Route
            path="/water-on-exoplanets"
            element={<WaterOnExoplanetsPage />}
          />
        </Routes>
      </Router>
    </UserInteractionProvider>
  );
}

export default App;
