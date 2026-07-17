import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn, signUp } from "../services/authService";
import { useLoggedUser } from "./useLoggedUser";
import { saveToken } from "../services/tokenStorage";

const useAuth = () => {
  const { setUser } = useLoggedUser();

  const queryClient = useQueryClient();

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setUser(data);
      saveToken();
    },
  });

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    signIn: ({ email, password, checkbox }) =>
      signInMutation.mutate({ email, password, checkbox }),
    signUp: (userObject) => signUpMutation.mutate(userObject),
  };
};

export default useAuth;
