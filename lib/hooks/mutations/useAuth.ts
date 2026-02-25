import { auth } from "@/lib/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "@/lib/hooks/useSession";
import { toast } from "sonner";

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
  const { setUser, user } = useSession();

  return useMutation({
    mutationFn: auth.updateUserById,
    onSuccess: async (response) => {
      if (response?.user && user) {
        await setUser({ ...user, ...response.user });
      }

      toast.success(response.message || "User updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update user");
    },
  });
};

export const useUpdatePersonalInfo = () => {
  const { setUser, user } = useSession();

  return useMutation({
    mutationFn: auth.updatePersonalInfo,
    onSuccess: (res) => {
      if (res.data && user) {
        setUser({ ...user, ...res.data });
      }

      toast.success("Profile image updated successfully!");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update profile image");
    },
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: auth.deleteUser,
  });
};
