import BoardHeader from "./BoardHeader";
import ColumnContainer from "./ColumnContainer";

const Board = () => {
  return (
    <div className="w-full">
      <BoardHeader />
      <ColumnContainer />
    </div>
  );
};

export default Board;
