import { auth } from "@/lib/services/auth.service";
import { useMutation } from "@tanstack/react-query";

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
