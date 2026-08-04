import { useState } from "react";
import Column from "./Column";
import ColumnForm from "./ColumnForm";
import useColumns from "../hooks/useColumns";
import { useParams } from "react-router-dom";

const ColumnContainer = () => {
  const { boardId } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const { columns, isError, isPending } = useColumns({ boardId });

  if (isPending) return "loading...";

  if (isError) return "error...";

  return (
    <div className="flex">
      {columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}

      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="rounded border-2 h-full min-h-120 p-4"
      >
        +Add New Column
      </button>
      {isOpen && <ColumnForm />}
    </div>
  );
};

export default ColumnContainer;
