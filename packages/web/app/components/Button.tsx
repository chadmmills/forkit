import { Button as RAButton, ButtonProps } from "react-aria-components";

export default function Button({ children, className }: ButtonProps) {
  return (
    <RAButton
      type="submit"
      className={`px-2 py-1 border border-gray-200 rounded-md ${className || ""}`}
    >
      {children}
    </RAButton>
  );
}
