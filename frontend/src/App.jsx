import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "lucide-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register"; 
import { ToastContainer } from "react-toastify";
import ChatbotButton from "./components/ChatBot/ChatbotButton";
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react";

const App = () => {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <SignedIn>
                <Home />
              </SignedIn>
            }
          />
          <Route
            path="/profile"
            element={
              <SignedIn>
                <Profile />
              </SignedIn>
            }
          />
          <Route
            path="/login"
            element={
              <SignedOut>
                <Login />
              </SignedOut>
            }
          />
          <Route
            path="/register"
            element={
              <SignedOut>
                <Register /> 
              </SignedOut>
            }
          />
          {/* Redirect all other routes to sign in if not authenticated */}
          <Route
            path="*"
            element={
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            }
          />
        </Routes>
        <ToastContainer />
        {/* Show ChatbotButton only when signed in */}
        <SignedIn>
          <ChatbotButton />
        </SignedIn>
      </Router>
    </>
  );
};

export default App;