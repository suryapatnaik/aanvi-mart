export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (userData: UserData) => void;
  onSignupSuccess?: (userData: UserData) => void;
}

export interface UserData {
  username: string;
  mobileNumber: string;
  isVerified: boolean;
}

export interface FormData {
  username: string;
  mobileNumber: string;
  otp: string;
}

export type ModalStep = 'form' | 'otp'; 