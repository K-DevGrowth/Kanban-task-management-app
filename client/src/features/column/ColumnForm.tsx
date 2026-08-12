import { useParams } from "react-router-dom";
import useColumns from "./useColumns.ts";
import useField from "../../shared/hooks/useField.ts";

const ColumnForm = () => {
  const { boardId } = useParams();
  const { createColumn } = useColumns({ boardId });
  const column = useField();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createColumn({ title: column.value });
  };

  return (
    <div className="absolute max-w-70">
      <form className=" bg-gray-800 text-white p-4" onSubmit={handleSubmit}>
        <label htmlFor="column-title">Title</label>
        <input
          type="text"
          id="column-title"
          className="border p-2"
          {...column}
        />
      </form>
    </div>
  );
};

export default ColumnForm;
