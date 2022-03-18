// Third party
import { TextInput } from '@mantine/core';

const TextInputOption = ( { id, label, value, onChange } ) => (
  <TextInput
    onChange={ ( { currentTarget: { value } }) => onChange( value ) }
    value={ value }
    placeholder={ id }
    label={ label }
    key={ id }
  />
);

export default TextInputOption;
