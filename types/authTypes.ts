export type loginFormField = {
  phone: string;
  password: string;
};

export type registerFormField = {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
};

export type User = {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  accessToken: string;
  userRoles: string[];
  refreshTokenExpiration?: string;
};
