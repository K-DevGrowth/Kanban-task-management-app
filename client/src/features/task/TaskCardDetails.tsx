import { useParams } from "react-router-dom";
import useColumns from "../column/useColumns.ts";
import useField from "../../shared/hooks/useField.ts";
import { useSubtasks } from "../subtask/useSubtasks.ts";

const TaskCardDetails = ({ task }) => {
  const { boardId } = useParams();
  const {
    columns,
    isPending: isColumnsPending,
    isError: isColumnsError,
  } = useColumns({ boardId });
  const { subtasks, isPending, isError, updateSubtask } = useSubtasks({
    taskId: task.id,
  });
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

      {subtasks.map((subtask, index) => (
        <div key={subtask.id}>
          <input
            type="checkbox"
            checked={subtask.isDone}
            onChange={(e) => {
              e.preventDefault();
              updateSubtask({
                subtaskId: subtask.id,
                isDone: e.target.checked,
              });
            }}
          />
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
