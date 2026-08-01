import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createColumn, getAllColumns } from "../services/columnService";

const useColumns = (boardId: string) => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["columns", boardId],
    queryFn: () => getAllColumns(boardId),
    enabled: !!boardId,
  });

  const createColumnMutation = useMutation({
    mutationFn: (payload: { title: string }) => createColumn(boardId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns", boardId] });
    },
  });

  return {
    columns: result.data,
    isError: result.isError,
    isPending: result.isPending,
    createColumn: createColumnMutation.mutate,
  };
};

export default useColumns;
