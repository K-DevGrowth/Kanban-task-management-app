import { QueryClient, useMutation } from "@tanstack/react-query";
import { signIn, signUp } from "../services/authService";
import { useLoggedUser } from "./useLoggedUser";

const useAuth = () => {
  const { user } = useLoggedUser();

  const queryClient = new QueryClient();

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    user: user,
    signIn: (userObject) => signInMutation.mutate(userObject),
    signUp: (userObject) => signUpMutation.mutate(userObject),
  };
};

export default useAuth;
