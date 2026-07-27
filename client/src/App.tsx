import { Route, Routes } from "react-router-dom";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";
import { useLoggedUser } from "./hooks/useLoggedUser";

const App = () => {
  const { user, loading } = useLoggedUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="flex w-full relative">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Sidebar />
            </>
          }
        />
        <Route
          path={`/boards/:boardId`}
          element={
            <>
              <Sidebar />
              <Board />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
