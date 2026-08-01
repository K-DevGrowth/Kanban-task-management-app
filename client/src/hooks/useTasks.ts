import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllTasks, createTask } from "../services/taskService";

const useTasks = (columnId: string) => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["tasks", columnId],
    queryFn: () => getAllTasks(columnId),
    enabled: !!columnId,
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", columnId] });
    },
  });

  return {
    tasks: result.data,
    isError: result.isError,
    isPending: result.isPending,
    createTask: createTaskMutation.mutate,
  };
};

export default useTasks;
