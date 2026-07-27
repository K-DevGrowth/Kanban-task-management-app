import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create, getAll } from "../services/columnService";

const useColumns = (boardId: string) => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["columns", boardId],
    queryFn: () => getAll(boardId),
    enabled: !!boardId,
  });

  const createColumnMutation = useMutation({
    mutationFn: (payload: { title: string }) => create(boardId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns", boardId] });
    },
  });

  return {
    columns: result.data,
    isError: result.isError,
    isPending: result.isPending,
    createColumn: (payload) => createColumnMutation.mutate(payload),
  };
};

export default useColumns;
