// React
import { useState, useMemo, useEffect } from 'react';

// Third party
import { map, reduce, groupBy } from 'lodash-es';
import { MantineProvider, Drawer, Group } from '@mantine/core';

import { ActionIcon } from '@mantine/core';
import { Adjustments } from 'tabler-icons-react';
import { Accordion, Button } from '@mantine/core';

// Hooks
import { useLocalStorage } from '@mantine/hooks';

// Components
import OptionComponents from './components';
import SwitchOption from './components/SwitchOption/SwitchOption';

const SketchUIDrawer = ({ options, name = '_', defaultOpenValue, getter, setter }) => {
  const optionsGroupedByCategory = useMemo( () => groupBy( options, 'category'), [ options ]);
  const [settings, setSettings] = useLocalStorage({ key: 'sketch-ui-settings', defaultValue: {
    autoSave: false,
    keepOpen: defaultOpenValue,
    accordionState: {},
  } });
  const [values, setValues] = useState((
    reduce(options, (values, option) => {
      values[option.id] = settings?.values?.[name]?.[option.id] ?? option.defaultValue;
      return values;
    }, {})
  ));
  const { autoSave, keepOpen, accordionState } = settings;
  const [opened, setOpened] = useState(keepOpen);

  const setValue = (id, value) => {
    setValues( previousValues => ({
      ...previousValues,
      [id]: value
    }))

    if (true !== autoSave) {
      return;
    }

    setSettings( previousSettings => ({
      ...previousSettings,
      values: {
        ...previousSettings.values,
        [id]: value
      }
    }))
  };

  const persistValues = () => {
    setSettings( previousSettings => {
      const touchedOptions = reduce(options, (touchedOptions, option) => {
        if (values[option.id] !== option.defaultValue) {
          touchedOptions[option.id] = values[option.id];
        }
        return touchedOptions;
      }, {} );

      return {
        ...previousSettings,
        values: {
          ...previousSettings.values,
          [name]: touchedOptions
        }
      }
    })
  };

  const resetValues = () => {
    setSettings( previousSettings => ({
      ...previousSettings,
      values: {
        [name]: {}
      },
      accordionState: {}
    }))
    setValues(reduce(options, (values, option) => {
      values[option.id] = option.defaultValue;
      return values;
    }, {}));
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
        opened={ opened }
        onClose={() => setOpened(false)}
        overlayOpacity={0}
        title="SketchUI 🎚"
        padding="lg"
        size="lg"
      >
        <Accordion
          multiple
          onChange={ state => {
            setSettings( previousSettings => ({
              ...previousSettings,
              accordionState: state
            }))
          } }
          initialState={ accordionState }
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

        <Group grow direction="column">
          <span></span>
          <Button
            variant="default"
            color="gray"
            onClick={ resetValues }
          >
            Reset options
          </Button>

          {/* <Button variant="default" color="gray">
            Load options
          </Button> */}

          <Button
            variant="default"
            color="gray"
            onClick={ persistValues }
          >
            Save options
          </Button>
          <span></span>
        </Group>

        <SwitchOption
          value={ autoSave }
          label="Auto save options"
          onChange={ checked => setSettings( previousSettings => ({
            ...previousSettings,
            autoSave: checked
          })) }
        />
        <span>&nbsp;</span>
      
        <SwitchOption
          value={ keepOpen }
          label="Keep SketchUI open"
          onChange={ checked => setSettings( previousSettings => ({
            ...previousSettings,
            keepOpen: checked
          })) }
        />

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
