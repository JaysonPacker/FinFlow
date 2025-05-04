import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Signup from "./pages/Signup";
import NotFoundPage from "./pages/NotFoundPage";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <div>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

const Root = () => {
  const isLoggedIn = !!localStorage.getItem("token"); // Replace with actual authentication logic
  return isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />;
};
