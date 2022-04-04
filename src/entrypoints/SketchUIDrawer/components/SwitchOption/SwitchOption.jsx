// Third party
import { Group, Text, Switch } from '@mantine/core';

const SwitchOption = ( { id, label, value, required, onChange } ) =>  (
  <Group position="apart" key={ id }>
    <Text size="sm">{ label }{ required && <span style={ {
      color: '#ff6b6b',
      fontWeight: 500
    }}> *</span> }</Text>
  
    <Switch
      checked={value}
      onChange={ event => onChange( event.currentTarget.checked ) }
    />
  </Group>
);

export default SwitchOption;
