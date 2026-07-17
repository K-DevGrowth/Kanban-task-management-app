import { useLoggedUser } from "../hooks/useLoggedUser";

const BoardHeader = () => {
  const { user } = useLoggedUser();

  return (
    <header className="flex justify-between items-center border p-4">
      <p>Name board</p>
      <div className="*:px-3">
        <button type="button">+Add New Task</button>
        {user ? (
          <button type="button">Log Out</button>
        ) : (
          <>
            <button type="button">Sign Up</button>
            <button type="button">Sign In</button>
          </>
        )}
      </div>
    </header>
  );
};

export default BoardHeader;
