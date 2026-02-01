import { Signup } from "@/components/auth/SignUpModal";
import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { VerifyOtp } from "@/components/auth/OTPModal";
import { Signin } from "@/components/auth/SignInModal";

interface Message {
  status?: string;
  success?: string;
  message: string;
}

interface Token {
  accessToken: string;
  refreshToken: string;
}

interface Address {
  id: string;
  userId: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude: string;
  longitude: string;
  placeId: string;
  provider: string;
  instructions: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  country: string;
  phoneNumber: string;
  email: string;
  referralCode: string;
  refreshToken: string;
  avatarUrl: string;
  fullName: string;
  addressess: string;
  address: Address[];
  others: string;
  labelAs: string;
  couponCode: string;
  setAddressDefault: boolean;
  role: "USER";
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse extends Omit<Message, "success"> {
  data: User;
}
interface UserData extends Omit<Message, "success"> {
  user: User;
}

interface SignInResponse extends AuthResponse {
  token: Token;
}

interface VerifyOtpResponse extends Message {
  token: Token;
}

export const auth = {
  async createUser(data: Omit<Signup, "confirmPassword">) {
    const res = await apiClient.post<AuthResponse>(
      API_ROUTES.auth.signUp,
      data
    );
    return res.data;
  },

  async signIn(data: Signin) {
    const res = await apiClient.post<SignInResponse>(
      API_ROUTES.auth.login,
      data
    );
    return res;
  },

  async VerifyOtp(data: VerifyOtp) {
    const res = await apiClient.post<VerifyOtpResponse>(
      API_ROUTES.auth.verifyOtp,
      data
    );

    return res.data;
  },

  async resendOtp(phoneNo: { phoneNumber: string }) {
    const res = await apiClient.post(API_ROUTES.auth.resendOtp, phoneNo);
    return res.data;
  },

  async getUserById(id: string) {
    const res = await apiClient.get<AuthResponse>(API_ROUTES.user(id));
    return res.data;
  },

  async updateUserById(id: string, payload: Partial<User>) {
    const res = await apiClient.patch<UserData>(
      API_ROUTES.user(id),
      payload
    );
    return res.data;
  },

  async deleteUser(id: string) {
    const res = await apiClient.delete(API_ROUTES.user(id));
    return res.data;
  },
};
