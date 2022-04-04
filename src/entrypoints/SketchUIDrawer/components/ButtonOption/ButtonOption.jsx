// Third party
import { Button } from '@mantine/core';
import * as Icons from 'tabler-icons-react';

const ButtonOption = ( { color = 'gray', variant = 'light', text, icon, onClick } ) => {
  const Icon = Icons[ icon ]
  
  return (
    <Button
      color={ color }
      variant={ variant }
      onClick={ onClick }
      style={ {
        width: '100%',
      } }
      leftIcon={ Icon && (
        <Icon size={14} />
      ) }
    >
      { text }
    </Button>
  );
}

export default ButtonOption;
