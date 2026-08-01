import { useQuery } from "@tanstack/react-query";
import { getOneBoard } from "../services/boardService";

const useBoard = ({ boardId }) => {
  const result = useQuery({
    queryKey: ["board", boardId],
    queryFn: () => getOneBoard(boardId),
  });

  return {
    board: result.data,
    isError: result.isError,
    isPending: result.isPending,
  };
};

export default useBoard;
