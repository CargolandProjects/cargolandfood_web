import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthState = 
  | 'idle'
  | 'signin'
  | 'signup' 
  | 'otp-verification'
  | 'forgot-password'
  | 'reset-password';

interface AuthFormData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  otpType?: 'signup' | 'signin' | 'forgot-password';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface AuthFlowStore {
  // State
  currentStep: AuthState;
  isOpen: boolean;
  formData: Partial<AuthFormData>;
  error: string | null;
  isLoading: boolean;

  // Actions
  openAuth: (step?: AuthState) => void;
  closeAuth: () => void;
  goToStep: (step: AuthState, data?: Partial<AuthFormData>) => void;
  setFormData: (data: Partial<AuthFormData>) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  clearError: () => void;
}

const useAuthFlow = create<AuthFlowStore>()(
  persist(
    (set) => ({
      // Initial state
      currentStep: 'idle',
      isOpen: false,
      formData: {},
      error: null,
      isLoading: false,

      // Actions
      openAuth: (step = 'signin') => {
        set({ 
          isOpen: true, 
          currentStep: step,
          error: null 
        });
      },

      closeAuth: () => {
        set({ 
          isOpen: false, 
          currentStep: 'idle',
          formData: {},
          error: null,
          isLoading: false
        });
      },

      goToStep: (step, data = {}) => {
        set(state => ({ 
          currentStep: step,
          formData: { ...state.formData, ...data },
          error: null
        }));
      },

      setFormData: (data) => {
        set(state => ({
          formData: { ...state.formData, ...data }
        }));
      },

      setError: (error) => {
        set({ error, isLoading: false });
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-flow-storage',
      // Only persist form data, not modal state
      partialize: (state) => ({ 
        formData: state.formData 
      }),
    }
  )
);

export default useAuthFlow;