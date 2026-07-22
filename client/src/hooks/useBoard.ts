import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create, getAll } from "../services/boardService";

const useBoard = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["boards"],
    queryFn: getAll,
  });

  const createBoardMutation = useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });

  return {
    boards: result.data,
    isPending: result.isPending,
    isError: result.isError,
    createBoard: (payload) => createBoardMutation.mutate(payload),
  };
};

export default useBoard;
