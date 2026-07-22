import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn, signUp } from "../services/authService";
import { saveToken } from "../services/tokenStorage.ts";

const useAuth = () => {
  const queryClient = useQueryClient();

  const signInMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signIn({ email, password }),
    onSuccess: (data, variables: { remember: boolean }) => {
      queryClient.setQueryData(["me"], data);

      saveToken(data.data.token, variables.remember);
    },
  });

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    signIn: (payload) => signInMutation.mutate(payload),
    signUp: (userObject) => signUpMutation.mutate(userObject),
  };
};

export default useAuth;
