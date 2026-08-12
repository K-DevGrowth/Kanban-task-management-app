import { useState } from "react";
import useColumns from "../column/useColumns.ts";
import useField from "../../shared/hooks/useField.ts";
import useTasks from "./useTasks.ts";
import { useParams } from "react-router-dom";
import { useSubtasks } from "../subtask/useSubtasks.ts";

const TaskForm = () => {
  const [field, setField] = useState([""]);
  const { boardId } = useParams();

  const title = useField();
  const description = useField();
  const status = useField();

  const { columns, isError, isPending } = useColumns({ boardId });
  const { createTaskAsync } = useTasks({ columnId: status.value });
  const { createSubtask } = useSubtasks();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = await createTaskAsync({
      title: title.value,
      description: description.value,
    });

    field.forEach((item) => {
      createSubtask({ taskId: newTask.id, title: item, isDone: false });
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
        {field.map((f, index) => (
          <input
            key={index}
            value={f}
            onChange={(e) => {
              const updated = field.map((item, i) =>
                i === index ? e.target.value : item,
              );
              setField(updated);
            }}
          />
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
