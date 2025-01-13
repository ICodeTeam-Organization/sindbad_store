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
  