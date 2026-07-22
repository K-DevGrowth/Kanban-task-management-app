import useBoard from "../hooks/useBoard";
import useField from "../hooks/useField";

const BoardForm = () => {
  const { createBoard } = useBoard();
  const title = useField();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createBoard({ title: title.value });
  };

  return (
    <div className="absolute max-w-70">
      <form className=" bg-gray-800 text-white p-4" onSubmit={handleSubmit}>
        <label htmlFor="board-title">Title</label>
        <input type="text" id="board-title" className="border p-2" {...title} />
      </form>
    </div>
  );
};

export default BoardForm;
