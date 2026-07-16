import { useQuery } from "@tanstack/react-query";
import { getAll } from "../services/boardService";

const useBoard = () => {
  const result = useQuery({
    queryKey: ["boards"],
    queryFn: getAll,
  });

  return {
    boards: result.data,
    isPending: result.isPending,
    isError: result.isError,
  };
};

export default useBoard;
