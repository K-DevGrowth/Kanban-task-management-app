import { useState } from "react";
import Column from "./Column.tsx";
import ColumnForm from "./ColumnForm.tsx";
import useColumns from "./useColumns.ts";
import { useParams } from "react-router-dom";
import { DragDropProvider } from "@dnd-kit/react";

const ColumnContainer = () => {
  const { boardId } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const { columns, isError, isPending } = useColumns({ boardId });

  if (isPending) return "loading...";

  if (isError) return "error...";

  const getNewOrder = (
    prevOrder: number | undefined,
    nextOrder: number | undefined,
  ): number => {
    if (prevOrder === undefined && nextOrder === undefined) return 0;

    if (prevOrder === undefined) return nextOrder! - 1;

    if (nextOrder === undefined) return prevOrder + 1;

    return (prevOrder + nextOrder) / 2;
  };

  const handleDragEnd = (e) => {
    if (e.canceled) return;
    const { source, target } = e.operation;
    console.log("keo task", source?.id, "tha vao", target?.id);
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className="flex">
        {columns.map((column, index) => (
          <Column key={column.id} index={index} column={column} />
        ))}

        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="rounded mt-10 ml-4 border-2 border-gray-500 h-full min-h-120 p-4"
        >
          +Add New Column
        </button>
        {isOpen && <ColumnForm />}
      </div>
    </DragDropProvider>
  );
};

export default ColumnContainer;
