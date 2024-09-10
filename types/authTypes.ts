export type UserLoginData = {
  email: string;
  password: string;
};

export type UserRegisterData = {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
};
