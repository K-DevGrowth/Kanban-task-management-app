import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllTasks, createTask } from "./taskService.ts";

const useTasks = ({ columnId }: { columnId: string }) => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["tasks", columnId],
    queryFn: () => getAllTasks(columnId),
    enabled: !!columnId,
  });

  const createTaskMutation = useMutation({
    mutationFn: (payload: { title: string; description: string }) =>
      createTask(columnId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", columnId] });
    },
  });

  return {
    tasks: result.data,
    isError: result.isError,
    isPending: result.isPending,
    createTask: createTaskMutation.mutate,
    createTaskAsync: createTaskMutation.mutateAsync,
  };
};

export default useTasks;
