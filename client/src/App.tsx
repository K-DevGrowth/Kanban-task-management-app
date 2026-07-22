import Board from "./components/Board";
import Sidebar from "./components/Sidebar";
import SignIn from "./components/SignIn";
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
      {user ? (
        <>
          <Sidebar />
          <Board />
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default App;
