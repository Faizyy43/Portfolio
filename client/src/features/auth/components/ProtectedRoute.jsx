import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("accessToken");

  console.log("TOKEN:", token); // 🔥 debug

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
