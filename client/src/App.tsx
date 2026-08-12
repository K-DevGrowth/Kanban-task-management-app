import { Navigate, Route, Routes } from "react-router-dom";
import Board from "./features/board/Board.tsx";
import Sidebar from "./layout/Sidebar";
import { useAuth } from "./features/auth/AuthContext.tsx";
import SignIn from "./features/auth/SignIn.tsx";

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
