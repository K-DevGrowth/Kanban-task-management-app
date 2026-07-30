import { useState } from "react";
import Column from "./Column";
import ColumnForm from "./ColumnForm";

const ColumnContainer = ({ board }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <Column boardId={board.id} />

      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="rounded border-2 h-full min-h-120 p-4"
      >
        +Add New Column
      </button>
      {isOpen && <ColumnForm boardId={board.id} />}
    </div>
  );
};

export default ColumnContainer;
