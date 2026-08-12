import { useState } from "react";
import { useAuth } from "../features/auth/AuthContext.tsx";
import TaskForm from "../features/task/TaskForm.tsx";
import useBoard from "../features/board/useBoard.ts";
import { useParams } from "react-router-dom";

const BoardHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { boardId } = useParams();
  const { board, isError, isPending } = useBoard({ boardId });

  if (isError) return "error...";

  if (isPending) return "loading...";

  return (
    <header className="flex justify-between items-center border p-4">
      <p>{board.title}</p>
      <div className="*:px-3">
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          +Add New Task
        </button>
        {isOpen && <TaskForm />}
        {user ? (
          <button type="button" onClick={logout}>
            Log Out
          </button>
        ) : (
          <>
            <button type="button">Sign Up</button>
            <button type="button">Sign In</button>
          </>
        )}
      </div>
    </header>
  );
};

export default BoardHeader;
