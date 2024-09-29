import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieReviewPage from "./pages/ReviewPage";
import Header from "./components/Header"; // Import the Header component
import AddMovie from "./pages/AddMovie";
import AddReview from "./pages/AddReview";
import "./index.css"; // Ensure your styles (including Tailwind) are imported

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:movieId" element={<MovieReviewPage />} />
          <Route path="/add-movie" element={<AddMovie />} />
          <Route path="/update-movie/:movieId" element={<AddMovie />} />
          <Route path="/add-review" element={<AddReview />} />
          <Route path="/update-review/:reviewId" element={<AddReview />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
