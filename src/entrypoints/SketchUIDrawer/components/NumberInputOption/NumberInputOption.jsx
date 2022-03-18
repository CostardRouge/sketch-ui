// Third party
import { NumberInput } from '@mantine/core';

const NumberInputOption = ( { id, min, max, step, label, value, onChange } ) => (
  <NumberInput
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
