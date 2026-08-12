import { useState } from "react";
import BoardListItem from "./BoardListItem";
import BoardForm from "./BoardForm";
import useBoards from "../features/board/useBoards.ts";

const BoardList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { boards, isPending, isError } = useBoards();

  if (isPending) return "loading...";

  if (isError) return "erorr...";

  return (
    <div>
      <ul>
        {boards.map((board) => (
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
