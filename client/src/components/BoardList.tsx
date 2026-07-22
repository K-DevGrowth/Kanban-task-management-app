import { useState } from "react";
import useBoards from "../hooks/useBoard";
import BoardListItem from "./BoardListItem";
import BoardForm from "./BoardForm";

const BoardList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { boards, isPending, isError, createBoard } = useBoards();

  if (isPending) return "loading...";

  if (isError) return "erorr...";

  return (
    <div>
      <ul>
        {boards.data.map((board) => (
          <BoardListItem key={board.id} board={board} />
        ))}
      </ul>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        +Create New Board
      </button>
      {isOpen && <BoardForm />}
    </div>
  );
};

export default BoardList;
