import ColumnHeader from "./ColumnHeader";
import TaskCard from "./TaskCard";

const Column = ({ column }) => {
  return (
    <div className="py-2 px-4 *:my-1">
      <ColumnHeader column={column} />
      <TaskCard column={column} />
    </div>
  );
};

export default Column;
