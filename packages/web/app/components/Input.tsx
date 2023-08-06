import {TextField, Label, Input as RAInput} from 'react-aria-components';

export default function InputComponent({label, name, type, value, onChange}: InputProps) {
  return (
  <TextField>
  <Label>Email</Label>
  <RAInput type='email'
  className="px-2 py-1 border border-gray-200 rounded-md"
  />
</TextField>
)
}

