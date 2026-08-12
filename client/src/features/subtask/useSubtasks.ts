import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSubtask,
  getAllSubtasks,
  updateSubtask,
} from "../services/subtaskService";

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

  const updateSubtaskMutation = useMutation({
    mutationFn: (payload: { subtaskId: string; isDone: boolean }) => {
      const { subtaskId, ...rest } = payload;
      return updateSubtask(subtaskId, rest);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subtasks", taskId] });
    },
  });

  return {
    subtasks: result.data,
    isError: result.isError,
    isPending: result.isPending,
    createSubtask: createSubtaskMutation.mutate,
    updateSubtask: updateSubtaskMutation.mutate,
  };
};
