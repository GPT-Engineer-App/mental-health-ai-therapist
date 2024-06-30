import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div>
        <h1 className="text-3xl text-center">Welcome to AI Therapist Chatbot</h1>
        <p className="text-center">
          Your mental health companion. Please <Link to="/login" className="text-blue-500">Login</Link> or <Link to="/register" className="text-blue-500">Register</Link> to continue.
        </p>
      </div>
    </div>
  );
};

export default Index;