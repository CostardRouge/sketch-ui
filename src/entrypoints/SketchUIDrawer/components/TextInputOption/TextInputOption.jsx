// Third party
import { TextInput } from '@mantine/core';

const TextInputOption = ( { id, label, value, required, onChange } ) => (
  <TextInput
    onChange={ ( { currentTarget: { value } }) => onChange( value ) }
    value={ value }
    placeholder={ id }
    label={ label }
    required={ required }
    key={ id }
  />
);

export default TextInputOption;
