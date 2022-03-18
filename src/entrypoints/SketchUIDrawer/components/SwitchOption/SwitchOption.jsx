// Third party
import { Group, Text, Switch } from '@mantine/core';

const SwitchOption = ( { id, label, value, onChange } ) =>  (
  <Group position="apart" key={ id }>
    <Text size="sm">{ label }</Text>
    <Switch
      checked={value}
      onChange={ event => onChange( event.currentTarget.checked ) }
    />
  </Group>
);

export default SwitchOption;
