// Third party
import { Group, Text, Slider } from '@mantine/core';

const SwitchOption = ( { id, label, value, marks, min, max, step, onChange } ) =>  (
  <Group direction="column" grow key={ id }>
    <Text size="sm">{ label }</Text>
  
    <Slider
      min={ min }
      max={ max }
      step={ step }
      value={ value }
      onChange={ value => onChange( value) }
      marks={ marks }
    />
    <span></span>
  </Group>
);

export default SwitchOption;
