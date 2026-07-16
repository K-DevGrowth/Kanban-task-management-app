import useBoards from "../hooks/useBoard";
import BoardListItem from "./BoardListItem";

const BoardList = () => {
  const { boards, isPending, isError } = useBoards();

  if (isPending) return "loading...";

  if (isError) return "erorr...";

  return (
    <div>
      <ul>
        {boards.data.map((board) => (
          <BoardListItem key={board.id} board={board} />
        ))}
      </ul>
    </div>
  );
};

export default BoardList;
