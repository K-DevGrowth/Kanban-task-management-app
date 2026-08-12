import BoardList from "../features/board/BoardList.tsx";

const Sidebar = () => {
  return (
    <div className="border max-w-62 w-full h-dvh px-4">
      <h1 className="text-3xl p-4">Kanban</h1>
      <p>ALL BOARDS (1)</p>
      <BoardList />
    </div>
  );
};

export default Sidebar;
