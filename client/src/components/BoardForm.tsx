import useBoards from "../hooks/useBoards";
import useField from "../hooks/useField";
import { getToken } from "../services/tokenStorage";

const BoardForm = () => {
  const { createBoard } = useBoards();
  const title = useField();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const token = getToken();
    createBoard({ title: title.value, token });
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
