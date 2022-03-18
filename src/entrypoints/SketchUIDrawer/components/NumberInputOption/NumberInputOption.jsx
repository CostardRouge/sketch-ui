// Third party
import { NumberInput } from '@mantine/core';

const NumberInputOption = ( { id, min, max, step, precision, label, value, onChange } ) => (
  <NumberInput
    value={ value }
    onChange={ value => onChange(value ) }
    min={ min }
    max={ max }
    step={ step }
    precision={ precision }
    placeholder={ id }
    label={ label }
    key={ id }
  />
);

export default NumberInputOption;
