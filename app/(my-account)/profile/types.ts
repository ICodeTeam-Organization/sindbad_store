export interface HeadTitleProps {
    title: string;
    description: string;
}

export interface InputFieldProps {
    label: string;
    input_type: string;
    input_placeholder : string
}

export interface SelectFieldProps {
    label: string;
    options: string[];
}

export interface ButtonProps {
    text: string;
    type: "button" | "submit" | "reset";
    className?: string;
}
  
export type ProfileType = {
    name: string;
    email: string;
    telePhone: string;
    phoneNumber: string;
    directorateId: string;
    governorateId: string;
  };

export type ProfileResponsiveType = {
  success: boolean;
  message: string;
  data: ProfileType
};