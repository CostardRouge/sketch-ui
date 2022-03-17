// Third party
import { Button } from '@mantine/core';
import * as Icons from 'tabler-icons-react';

const ButtonOption = ( { color = 'gray', variant = 'light', text, icon, action } ) => {
  const Icon = Icons[ icon ]
  
  return (
    <Button
      color={ color }
      variant={ variant }
      onClick={ action }
      leftIcon={ Icon && (
        <Icon size={14} />
      ) }
    >
      { text }
    </Button>
  );
}

export default ButtonOption;
