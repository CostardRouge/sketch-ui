// Third party
import { Select } from '@mantine/core';

const SelectOption = ( { id, label, options, value, onChange, required } ) => (
  <Select
    onChange={ value => onChange( value ) }
    value={ value }
    data={ options }
    placeholder={ id }
    required={ required }
    label={ label }
    key={ id }
  />
);

export default SelectOption;
