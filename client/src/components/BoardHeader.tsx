import { useState } from "react";
import { useLoggedUser } from "../hooks/useLoggedUser";
import TaskForm from "./TaskForm";

const BoardHeader = ({ board }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useLoggedUser();

  return (
    <header className="flex justify-between items-center border p-4">
      <p>{board.title}</p>
      <div className="*:px-3">
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          +Add New Task
        </button>
        {isOpen && <TaskForm boardId={board.id} />}
        {user ? (
          <button type="button">Log Out</button>
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
