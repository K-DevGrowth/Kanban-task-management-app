import useTasks from "../task/useTasks.ts";
import TaskCard from "../task/TaskCard.tsx";
import { CollisionPriority } from "@dnd-kit/abstract";
import { useSortable } from "@dnd-kit/react/sortable";

const Column = ({ column, index }) => {
  const { tasks, isError, isPending } = useTasks({ columnId: column.id });
  const { ref } = useSortable({
    id: column.id,
    index,
    type: "column",
    collisionPriority: CollisionPriority.Low,
    accept: ["task", "column"],
  });

  if (isError) return "error...";

  if (isPending) return "loading...";

  return (
    <div className="flex">
      <div className="py-2 px-4 *:my-1" ref={ref}>
        <div>{column.title}</div>
        {tasks.map((task, index) => (
          <TaskCard key={task.id} task={task} index={index} column={column} />
        ))}
      </div>
    </div>
  );
};

export default Column;
