import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import ImageDetails from "./pages/ImageDetails";
import { ImageProvider } from "./context/ImageContext";
import NotFoundPage from "./pages/NotFound";

function App() {
  return (
    <ImageProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/image/:id" element={<ImageDetails />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ImageProvider>
  );
}

export default App;
