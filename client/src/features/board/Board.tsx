import BoardHeader from "./BoardHeader.tsx";
import ColumnContainer from "../column/ColumnContainer.tsx";

const Board = () => {
  return (
    <div className="w-full">
      <BoardHeader />
      <ColumnContainer />
    </div>
  );
};

export default Board;
