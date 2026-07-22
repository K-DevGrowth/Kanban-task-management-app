import BoardList from "./BoardList";

const Sidebar = () => {
  return (
    <div className="border w-62.5 h-dvh px-4">
      <h1 className="text-3xl p-4">Kanban</h1>
      <p>ALL BOARDS (1)</p>
      <BoardList />
    </div>
  );
};

export default Sidebar;
