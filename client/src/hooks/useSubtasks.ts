import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSubtask, getAllSubtasks } from "../services/subtaskService";

export const useSubtasks = ({ taskId }: { taskId?: string } = {}) => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["subtasks", taskId],
    queryFn: () => getAllSubtasks(taskId),
    enabled: !!taskId,
  });

  const createSubtaskMutation = useMutation({
    mutationFn: (payload: {
      taskId: string;
      title: string;
      isDone: boolean;
    }) => {
      const { taskId, ...rest } = payload;
      return createSubtask(taskId, rest);
    },
    
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["subtasks", variables.taskId],
      });
    },
  });

  return {
    subtasks: result.data,
    isError: result.isError,
    isPending: result.isPending,
    createSubtask: createSubtaskMutation.mutate,
  };
};
