import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBoard, getAllBoards } from "./boardService.ts";

const useBoards = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["boards"],
    queryFn: getAllBoards,
  });

  const createBoardMutation = useMutation({
    mutationFn: createBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });

  return {
    boards: result.data,
    isPending: result.isPending,
    isError: result.isError,
    createBoard: createBoardMutation.mutate,
  };
};

export default useBoards;
