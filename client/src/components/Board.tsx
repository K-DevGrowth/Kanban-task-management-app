import { useParams } from "react-router-dom";
import BoardHeader from "./BoardHeader";
import ColumnContainer from "./ColumnContainer";
import useBoard from "../hooks/useBoard";

const Board = () => {
  const { boardId } = useParams();
  const { board, isError, isPending } = useBoard({ boardId });

  if (isError) return "error...";

  if (isPending) return "loading...";

  return (
    <div className="w-full">
      <BoardHeader board={board.data} />
      <ColumnContainer />
    </div>
  );
};

export default Board;
