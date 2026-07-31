import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSubtask, getAllSubtasks } from "../services/subtaskService";

export const useSubtasks = (taskId: string) => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["subtasks", taskId],
    queryFn: () => getAllSubtasks(taskId),
  });

  const createSubtaskMutation = useMutation({
    mutationFn: (payload: { title: string; isDone: boolean }) =>
      createSubtask(taskId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subtasks", taskId] });
    },
  });

  return {
    subtasks: result.data,
    isError: result.isError,
    isPending: result.isLoading,
    createSubtask: createSubtaskMutation.mutate,
  };
};
