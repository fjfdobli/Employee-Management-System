import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateTaskPage from "./pages/CreateTaskPage";
import EditTaskPage from "./pages/EditTaskPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateTaskPage />} />
        <Route path="/edit/:id" element={<EditTaskPage />} />
      </Routes>
    </Router>
  );
};

export default App;