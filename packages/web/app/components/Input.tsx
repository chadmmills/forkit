import { TextField, Label, Input as RAInput } from "react-aria-components";

type InputProps = {
  label: string;
  name: string;
  type: "email" | "password" | "text";
  value?: string | number;
};

export default function InputComponent({
  label,
  name,
  type,
  value,
}: InputProps) {
  return (
    <TextField>
      <Label>
        {label}
        <RAInput
          type={type}
          name={name}
          className="block px-2 py-1 border border-gray-200 rounded-md"
          value={value}
        />
      </Label>
    </TextField>
  );
}
