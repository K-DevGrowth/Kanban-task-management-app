import useBoards from "../hooks/useBoards";
import useColumns from "../hooks/useColumns";
import useField from "../hooks/useField";
import { useSubtasks } from "../hooks/useSubtasks";

const TaskCardDetails = ({ task }) => {
  const { subtasks, isPending, isError } = useSubtasks(task.id);
  const { boards } = useBoards();
  const { columns } = useColumns(boards?.data[0].id);
  const status = useField(task.columnId);

  if (isError) return "error...";

  if (isPending) return "loading...";

  return (
    <div>
      <p>{task.title}</p>
      <p>{task.description}</p>
      <p>
        Subtasks ( {subtasks?.data.filter((subtask) => subtask.isDone).length}{" "}
        of {subtasks?.data.length} )
      </p>
      {subtasks?.data.map((subtask) => (
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
        {columns.data.map((column) => (
          <option key={column.id} value={column.id}>
            {column.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskCardDetails;
