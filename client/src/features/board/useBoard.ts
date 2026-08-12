import { useQuery } from "@tanstack/react-query";
import { getOneBoard } from "./boardService.ts";

const useBoard = ({ boardId }: { boardId: string }) => {
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
