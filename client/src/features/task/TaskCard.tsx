import { useState } from "react";
import { useSubtasks } from "../subtask/useSubtasks.ts";
import TaskCardDetails from "./TaskCardDetails.tsx";
import { useSortable } from "@dnd-kit/react/sortable";

const TaskCard = ({ task, index, column }) => {
  const { ref, isDragging } = useSortable({
    id: task.id,
    index,
    type: "task",
    accept: "task",
    group: column.id,
  });
  const { subtasks, isPending, isError } = useSubtasks({ taskId: task.id });
  const [isOpen, setIsOpen] = useState(false);

  if (isError) return "error...";

  if (isPending) return "loading...";

  const subtaskCount = subtasks.filter((subtask) => subtask.isDone).length;

  return (
    <div className="rounded min-w-50">
      <button
        className="border-2 cursor-pointer border-gray-300 w-full rounded p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
        ref={ref}
        data-dragging={isDragging}
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
