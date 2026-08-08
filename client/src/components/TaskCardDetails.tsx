import { useParams } from "react-router-dom";
import useColumns from "../hooks/useColumns";
import useField from "../hooks/useField";
import { useSubtasks } from "../hooks/useSubtasks";

const TaskCardDetails = ({ task }) => {
  const { boardId } = useParams();
  const {
    columns,
    isPending: isColumnsPending,
    isError: isColumnsError,
  } = useColumns({ boardId });
  const { subtasks, isPending, isError } = useSubtasks({ taskId: task.id });
  const status = useField(task.columnId);

  if (isError) return "error...";

  if (isPending) return "loading...";

  if (isColumnsError) return "error...";

  if (isColumnsPending) return "loading...";

  return (
    <div>
      <p>{task.title}</p>
      <p>{task.description}</p>
      <p>
        Subtasks ( {subtasks.filter((subtask) => subtask.isDone).length} of{" "}
        {subtasks.length} )
      </p>

      {subtasks.map((subtask) => (
        <div key={subtask.id}>
          <input type="checkbox" checked={subtask.isDone} readOnly />
          <span>{subtask.title}</span>
        </div>
      ))}

      <label htmlFor="status">Status</label>
      <select name="status" id="status" required {...status}>
        <option value="" disabled>
          -- Choose column --
        </option>
        {columns.map((column) => (
          <option key={column.id} value={column.id}>
            {column.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskCardDetails;
