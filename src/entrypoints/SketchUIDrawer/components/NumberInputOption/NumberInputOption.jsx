// Third party
import { NumberInput } from '@mantine/core';

const NumberInputOption = ( { id, min, max, step, defaultValue, label, value, onChange } ) => (
  <NumberInput
    defaultValue={ defaultValue }
    value={ value }
    onChange={ value => onChange( id, value ) }
    min={ min }
    max={ max }
    step={ step }
    placeholder={ id }
    label={ label }
    key={ id }
  />
);

export default NumberInputOption;