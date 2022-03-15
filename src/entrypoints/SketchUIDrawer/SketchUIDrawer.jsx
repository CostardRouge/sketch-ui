// React
import { useState, useEffect, useMemo } from 'react';

// Contexts
import { SketchUIConfigurationContext } from './contexts';

// Third party
import { map, groupBy } from 'lodash-es';
import { MantineProvider, Drawer, Button, Group } from '@mantine/core';

import { ActionIcon } from '@mantine/core';
import { Adjustments } from 'tabler-icons-react';

import { Circle } from 'tabler-icons-react';
import { PlayerPause } from 'tabler-icons-react';
import { Eraser } from 'tabler-icons-react';
import { DeviceFloppy } from 'tabler-icons-react';

import { Text } from '@mantine/core';
import { Switch } from '@mantine/core';
import { Divider } from '@mantine/core';
import { Title } from '@mantine/core';
import { Accordion } from '@mantine/core';
import { Slider } from '@mantine/core';
import { NumberInput } from '@mantine/core';

const SketchUIDrawer = ({ options, values, onChange }) => {
  const [opened, setOpened] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [ loading, setLoading ]);

  const optionsGroupedByCategory = useMemo( () => groupBy( options, 'category'), [ options ]);

  return (
    <MantineProvider
      theme={ {
        colorScheme: 'dark',
      } }
    >
      <SketchUIConfigurationContext.Provider value={ options }>
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          title="SketchUI"
          padding="lg"
          size="lg"
        >
          <Group direction="column" grow>
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
                    {
                      map( categoryOptions, option => {
                        const { type } = option;

                        if ( type === 'number' ) {
                          const { id, min, max, step, defaultValue, label } = option;
                          const value = values[ option.id ] || defaultValue;

                          return (
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
                          )
                        }
                    })
                  }
                  </Accordion.Item>
                ) )
              }
              <Accordion.Item label="Colors">
                Configure components appearance and behavior with vast amount of settings or overwrite any part of component styles
              </Accordion.Item>

              <Accordion.Item label="Canvas">
                Configure components appearance and behavior with vast amount of settings or overwrite any part of component styles
              </Accordion.Item>

              <Accordion.Item label="General">
                <Group position="apart">
                  <Text size="sm">Show frame rate</Text>
                  <Switch />
                </Group>
                
                <Text size="sm">General time speed</Text>
                <Slider
                  min={-2}
                  max={2}
                  step={1}
                  showLabelOnHover={false}
                  marks={[
                    { value: -2, label: '-2' },
                    { value: -1, label: '-1' },
                    { value: 0, label: '0' },
                    { value: 1, label: '1' },
                    { value: 2, label: '2' },
                  ]}
                />
              </Accordion.Item>
            </Accordion>

            <Button color="gray" variant="light" leftIcon={<Eraser size={14}/>}>Clear</Button>
            <Button color="gray" variant="light" leftIcon={<PlayerPause size={14}/>}>Pause</Button>
            <Button color="gray" variant="light" leftIcon={<Circle size={14} />}>Start recording</Button>
            <Button color="gray" variant="light" leftIcon={<DeviceFloppy size={14} />}>Save .png</Button>

            <Divider my="xs" label="Presets" variant="" labelProps={{size: "md"}}/>
            <Group grow>
              <Button color="gray" variant="subtle">Default</Button>
              <Button color="gray"variant="subtle">Load</Button>
              <Button color="gray" variant="light">Save</Button>
            </Group>
          </Group>
        </Drawer>

        <Group position="center">
          <ActionIcon
            loading={loading}
            onClick={() => setOpened(true)}
          >
            <Adjustments />
          </ActionIcon>
        </Group>
      </SketchUIConfigurationContext.Provider>
    </MantineProvider>
  );
}

export default SketchUIDrawer;