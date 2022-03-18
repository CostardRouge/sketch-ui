// Third party
import { Select } from '@mantine/core';

const SelectOption = ( { id, label, options, value, onChange } ) => (
  <Select
    onChange={ value => onChange( id, value ) }
    value={ value }
    data={ options }
    placeholder={ id }
    label={ label }
    key={ id }
  />
);

export default SelectOption;
