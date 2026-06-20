import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
    const isLoggedIn = Boolean(localStorage.getItem("token"));

    return (
        <Routes>
            <Route
                path="/login"
                element={
                    isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage />
                }
            />

            <Route
                path="/register"
                element={
                    isLoggedIn ? <Navigate to="/dashboard" replace /> : <RegisterPage />
                }
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/"
                element={
                    isLoggedIn ? (
                        <Navigate to="/dashboard" replace />
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;