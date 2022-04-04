// React
import { useState, useMemo, useEffect, Fragment } from 'react';

// Third party
import { map, reduce, groupBy } from 'lodash-es';
import { MantineProvider, Drawer, Group } from '@mantine/core';

import { ActionIcon } from '@mantine/core';
import { Adjustments } from 'tabler-icons-react';
import { Accordion, Button, ScrollArea } from '@mantine/core';


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
    values: {}
  } });
  const [values, setValues] = useState((
    reduce(options, (values, option) => {
      values[option.id] = settings.values?.[name]?.[option.id] ?? option.defaultValue;
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
        [name]: {
          ...previousSettings.values[name],
          [id]: value
        }
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
        <ScrollArea
          style={ {
            height: '90%',
            marginLeft: -20,
            marginRight: -20
          } }
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
                      map( categoryOptions, ( { type, hidden, ...option } ) => {
                        const OptionComponent = OptionComponents[type];

                        if (true === hidden || !OptionComponent) {
                          return null;
                        }

                        const onChange = value => {
                          setValue(option.id, value);
                          option.onChange && option.onChange(value);
                        };

                        return (
                          <div
                            key={ option.id }
                            onClick={ ( { detail }) => {
                              if (detail === 2 ) {
                                onChange( option.defaultValue )
                              }
                            } }
                          >
                            <OptionComponent
                              { ...option }
                              onChange={ onChange }
                              value={ values[option.id] }
                              required={ option.defaultValue !== values[option.id] }
                            />
                          </div>
                        );
                      })
                    }
                  </Group>
                </Accordion.Item>
              ) )
            }
          </Accordion>

          <Group
            grow
            direction="column"
            style={ {
              marginLeft: 16,
              marginRight: 16
            } }
          >
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
          </Group>

          <Group
            grow
            direction="column"
            style={ {
              marginLeft: 16,
              marginRight: 16
            } }
          >
            <span></span>

            <SwitchOption
              value={ autoSave }
              label="Auto save options"
              onChange={ checked => setSettings( previousSettings => ({
                ...previousSettings,
                autoSave: checked
              })) }
            />
      
            <SwitchOption
              value={ keepOpen }
              label="Keep SketchUI open"
              onChange={ checked => setSettings( previousSettings => ({
                ...previousSettings,
                keepOpen: checked
              })) }
            />
          </Group>
        </ScrollArea>
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
