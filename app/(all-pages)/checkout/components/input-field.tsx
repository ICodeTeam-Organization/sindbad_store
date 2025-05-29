import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type InputFieldProps = {
  className?: string;
  control: any;
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  description?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  className,
  control,
  name,
  label,
  type,
  placeholder,
  description,
}) => {
  return (
    <div className={cn(className, "mb-4")}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input type={type} min={0} placeholder={placeholder} {...field} />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default InputField;
