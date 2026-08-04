import { useState } from "react";
import useColumns from "../hooks/useColumns";
import useField from "../hooks/useField";
import useTasks from "../hooks/useTasks";
import { useParams } from "react-router-dom";

const TaskForm = () => {
  const [field, setField] = useState([""]);
  const { boardId } = useParams();

  const title = useField();
  const description = useField();
  const status = useField();
  const { columns, isError, isPending } = useColumns({ boardId });
  const { createTask } = useTasks(status.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask({
      columnId: status.value,
      title: title.value,
      description: description.value,
    });
  };

  if (isError) return "error...";

  if (isPending) return "loading...";

  return (
    <div className="absolute max-w-70  bg-gray-800 text-white p-4">
      <h3>Add New Task</h3>
      <form className="*:block" onSubmit={handleSubmit}>
        <label htmlFor="task-title">Title</label>
        <input type="text" id="task-title" {...title} />

        <label htmlFor="description-title">Description</label>
        <input type="text" id="description-title" {...description} />

        <label htmlFor="subtasks">Subtasks</label>
        {field.map((f) => (
          <input key={f} />
        ))}

        <button type="button" onClick={() => setField([...field, ""])}>
          + Add new subtasks
        </button>

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

        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
