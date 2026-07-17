import Board from "./components/Board";
import Sidebar from "./components/Sidebar";
import SignIn from "./components/SignIn";
import { useLoggedUser } from "./hooks/useLoggedUser";

const App = () => {
  const { user } = useLoggedUser();

  return (
    <div className="flex w-full">
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
