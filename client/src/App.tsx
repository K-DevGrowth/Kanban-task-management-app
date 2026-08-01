import { Navigate, Route, Routes } from "react-router-dom";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./context/AuthContext";
import SignIn from "./components/SignIn";

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        loading...
      </div>
    );
  }

  return (
    <div className="flex w-full relative">
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" replace /> : <SignIn />}
        />
        <Route
          path="/dashboard"
          element={user ? <Sidebar /> : <Navigate to="/" replace />}
        />
        <Route
          path="/boards/:boardId"
          element={
            user ? (
              <>
                <Sidebar />
                <Board />
              </>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
