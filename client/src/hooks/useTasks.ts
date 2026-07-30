import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAll, create } from "../services/taskService";

const useTasks = (columnId: string) => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["tasks", columnId],
    queryFn: () => getAll(columnId),
    enabled: !!columnId,
  });

  const createTaskMutation = useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", columnId] });
    },
  });

  return {
    tasks: result.data,
    isError: result.isError,
    isPending: result.isPending,
    createTask: (payload) => createTaskMutation.mutate(payload),
  };
};

export default useTasks;
