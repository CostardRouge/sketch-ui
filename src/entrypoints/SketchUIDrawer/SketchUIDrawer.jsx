// React
import { useState, useMemo, useEffect } from 'react';

// Third party
import { map, reduce, groupBy } from 'lodash-es';
import { MantineProvider, Drawer, Group } from '@mantine/core';

import { ActionIcon } from '@mantine/core';
import { Adjustments } from 'tabler-icons-react';
import { Accordion } from '@mantine/core';

// Components
import OptionComponents from './components';

const SketchUIDrawer = ({ options, defaultOpenValue, getter, setter }) => {
  const defaultValues = useMemo( () => (
    reduce(options, (values, option) => {
      values[option.id] = option.defaultValue;
      return values;
    }, {})
  ), [options]);
  const [values, setValues] = useState(defaultValues);
  const [opened, setOpened] = useState(defaultOpenValue);
  const optionsGroupedByCategory = useMemo( () => groupBy( options, 'category'), [ options ]);

  const setValue = (id, value) => {
    setValues( previousValues => ({
      ...previousValues,
      [id]: value
    }))
  };

  useEffect( () => {
    getter( id => values[id] );
    setter( setValue );
  }, [ values ]);

  return (
    <MantineProvider
      theme={ {
        colorScheme: 'dark',
      } }
    >
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        overlayOpacity={0}
        title="SketchUI 🎚"
        padding="lg"
        size="lg"
      >
        <Accordion
          multiple
          initialItem={0}
          style={{ marginLeft: -20, marginRight: -20 }}
          iconPosition="right"
        >
          {
            map( optionsGroupedByCategory, ( categoryOptions, category ) => (
              <Accordion.Item
                key={ category }
                label={ category }
              >
                <Group direction="column" grow>
                  {
                    map( categoryOptions, ( { type, ...option } ) => {
                      const OptionComponent = OptionComponents[type];

                      if (OptionComponent) {
                        return (
                          <OptionComponent
                            { ...option }
                            key={ option.id }
                            onChange={ value => {
                              setValue(option.id, value);
                              option.onChange && option.onChange(value);
                            } }
                            value={ values[option.id] }
                          />
                        )
                      }

                        return null;
                    })
                  }
                </Group>
                </Accordion.Item>
            ) )
          }
        </Accordion>
      </Drawer>

      <Group position="center">
        <ActionIcon
          onClick={() => setOpened(true)}
        >
          <Adjustments />
        </ActionIcon>
      </Group>
    </MantineProvider>
  );
}

export default SketchUIDrawer;
