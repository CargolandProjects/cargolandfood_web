import { auth, User } from "@/lib/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "@/lib/hooks/useSession";

export const useSignUp = () => {
  return useMutation({
    mutationFn: auth.createUser,
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: auth.signIn,
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: auth.VerifyOtp,
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: auth.resendOtp,
  });
};

export const useUpdateUser = () => {
  const { setUser } = useSession();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<User> }) =>
      auth.updateUserById(id, payload),
    onSuccess: (response) => {
      if (response?.user) {
        setUser(response.user);
      }
    },
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: auth.deleteUser,
  });
};
