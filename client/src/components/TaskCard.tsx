import useTasks from "../hooks/useTasks";

const TaskCard = ({ columnId }) => {
  const { tasks, isError, isPending } = useTasks(columnId);

  if (isError) return "error...";

  if (isPending) return "loading...";

  return (
    <div className="rounded border-2 h-full min-h-120 p-4">
      {tasks.data.map((task) => (
        <div key={task.id}>
          <p>{task.title}</p>
          <span>0 of 3 subtasks</span>
        </div>
      ))}
    </div>
  );
};

export default TaskCard;
