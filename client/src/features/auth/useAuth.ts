import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn, signUp } from "./authService.ts";
import { useAuth } from "./AuthContext.tsx";

const useAuthMutations = () => {
  const queryClient = useQueryClient();
  const { login } = useAuth();

  const signInMutation = useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      signIn(payload),
    onSuccess: (response) => {
      const { token, user } = response;
      login(token, user, user);
      queryClient.setQueryData(["me", user.id], user);
    },
  });

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (response) => {
      const { token, user } = response;
      login(token, user, user);
      queryClient.setQueryData(["me", user.id], user);
    },
  });

  return {
    signIn: signInMutation.mutate,
    signUp: signUpMutation.mutate,
  };
};

export default useAuthMutations;
