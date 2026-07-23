import { Link } from "react-router-dom";

const BoardListItem = ({ board }) => {
  return (
    <li className="w-full px-3 py-2 my-2">
      <Link to={`/boards/${board.id}`}>{board.title}</Link>
    </li>
  );
};

export default BoardListItem;
