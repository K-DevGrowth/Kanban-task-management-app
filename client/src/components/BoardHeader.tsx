const BoardHeader = () => {
  return (
    <header className="flex justify-between items-center border p-4">
      <p>Name board</p>
      <div className="*:px-3">
        <button type="button">+Add New Task</button>
        <button>Sign Up</button>
        <button>Sign In</button>
      </div>
    </header>
  );
};

export default BoardHeader;
