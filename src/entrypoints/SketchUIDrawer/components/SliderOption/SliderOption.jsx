// Third party
import { Group, Text, Slider } from '@mantine/core';

const SliderOption = ( { id, label, value, marks, min, max, step, required, onChange } ) =>  (
  <Group direction="column" grow key={ id }>
    <Text size="sm">{ label }{ required && <span style={ {
      color: '#ff6b6b',
      fontWeight: 500
    }}> *</span> }</Text>
  
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

export default SliderOption;
