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
  code?:string
};
