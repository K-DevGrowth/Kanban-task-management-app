import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create, getAll } from "../services/boardService";

const useBoards = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["boards"],
    queryFn: getAll,
  });

  const createBoardMutation = useMutation({
    mutationFn: ({ title, token }) => create({ title }, token),
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

export default useBoards;
