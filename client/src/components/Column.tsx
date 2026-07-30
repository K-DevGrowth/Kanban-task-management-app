import useColumns from "../hooks/useColumns";
import ColumnHeader from "./ColumnHeader";
import TaskCard from "./TaskCard";

const Column = ({ boardId }) => {
  const { columns, isError, isPending } = useColumns(boardId);

  if (isPending) return "loading...";

  if (isError) return "error...";

  return (
    <div className="flex">
      {columns.data.map((column) => (
        <div key={column.id} className="py-2 px-4 *:my-1">
          <ColumnHeader columnTitle={column.title} />
          <TaskCard columnId={column.id} />
        </div>
      ))}
    </div>
  );
};

export default Column;
