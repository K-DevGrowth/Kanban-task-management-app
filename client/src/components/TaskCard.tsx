import { useState } from "react";
import { useSubtasks } from "../hooks/useSubtasks";
import TaskCardDetails from "./TaskCardDetails";

const TaskCard = ({ task }) => {
  const { subtasks, isPending, isError } = useSubtasks({ taskId: task.id });
  const [isOpen, setIsOpen] = useState(false);

  if (isError) return "error...";

  if (isPending) return "loading...";

  const subtaskCount = subtasks.filter((subtask) => subtask.isDone).length;

  return (
    <div className="rounded min-w-40">
      <button
        className="border-2 cursor-pointer border-gray-300 w-full rounded p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>{task.title}</p>
        <span>
          {subtaskCount} of {subtasks.length} subtasks
        </span>
      </button>
      {isOpen && <TaskCardDetails task={task} />}
    </div>
  );
};

export default TaskCard;
