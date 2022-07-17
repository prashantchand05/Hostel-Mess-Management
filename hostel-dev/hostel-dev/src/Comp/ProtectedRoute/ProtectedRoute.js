import React, { useEffect } from "react";
import { auth } from "../../module/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
      alert("You need to login first");
    }
    if (!loading && user) {
      navigate("/home");
    }
  }, [user, loading]);
  return <div>{children}</div>;
};
export default ProtectedRoute;
