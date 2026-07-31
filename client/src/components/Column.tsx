import useTasks from "../hooks/useTasks";
import ColumnHeader from "./ColumnHeader";
import TaskCard from "./TaskCard";

const Column = ({ column }) => {
  const { tasks, isError, isPending } = useTasks(column.id);

  if (isError) return "error...";

  if (isPending) return "loading...";

  return (
    <div className="flex">
      <div className="py-2 px-4 *:my-1">
        <ColumnHeader columnTitle={column.title} />
        {tasks.data.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
