
import Main from "./app/Main";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CheckAuth from "./components/auth/check-auth";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./app/Sign-in";
import AuthRegister from "./app/Sign-up";
import { checkAuth } from "./store/auth-slice";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Dashboard from "./app/Dashboard";
import CoverLetter from "./app/CoverLetter";
import Resume from "./app/Resume";
import Assessments from "./app/Assessments";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />

        <Route
          path="/auth/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="sign-in" element={<AuthLogin />} />
          <Route path="sign-up" element={<AuthRegister />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Dashboard />
            </CheckAuth>
          }
        />
        <Route
          path="/cover-letter"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <CoverLetter />
            </CheckAuth>
          }
        />
        <Route
          path="/resume-builder"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Resume />
            </CheckAuth>
          }
        />
        <Route
          path="/interview-prep"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Assessments />
            </CheckAuth>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
